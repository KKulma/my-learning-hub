import { getCollection, type CollectionEntry } from 'astro:content';

export type Course = CollectionEntry<'courses'>;
export type CourseNote = CollectionEntry<'courseNotes'>;

export interface CoursePage {
  id: string; // e.g. "ml/01-supervised-learning/02-gradient-descent"
  title: string;
  description?: string;
  entry: CourseNote;
  chapter: CourseChapter;
}

export interface CourseChapter {
  id: string; // e.g. "ml/01-supervised-learning"
  title: string;
  description?: string;
  number: number; // 1-based position within the course
  intro?: CourseNote; // optional <chapter>/index.md
  pages: CoursePage[];
}

export interface CourseTree {
  course: Course;
  chapters: CourseChapter[];
  /** All pages in reading order, across chapters (drives prev/next). */
  pages: CoursePage[];
}

/** "01-gradient-descent" -> 1 (or Infinity if there is no numeric prefix). */
const prefixNumber = (name: string) => {
  const match = name.match(/^(\d+)[-_]/);
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
};

/** "01-supervised-learning" -> "Supervised Learning" */
export const humanize = (name: string) =>
  name
    .replace(/^\d+[-_]/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const byOrder = <T extends { order: number; name: string }>(a: T, b: T) =>
  a.order - b.order || a.name.localeCompare(b.name);

export async function getCourseTrees(): Promise<Map<string, CourseTree>> {
  const courses = await getCollection('courses');
  const notes = await getCollection('courseNotes');

  type RawChapter = { intro?: CourseNote; pages: CourseNote[] };
  const courseIds = new Set(courses.map((c) => c.id));
  const chaptersByCourse = new Map<string, Map<string, RawChapter>>();
  const directPagesByCourse = new Map<string, CourseNote[]>();

  for (const note of notes) {
    const parts = note.id.split('/');
    if (parts.length < 2) continue;
    const [courseId, chapterName, ...rest] = parts;
    if (!courseIds.has(courseId)) {
      throw new Error(
        `Course note "${note.id}" has no course overview. Create src/content/courses/${courseId}/index.md with the course metadata.`,
      );
    }
    const isIndex = note.filePath ? /[\\/]index\.(md|mdx)$/.test(note.filePath) : false;
    if (parts.length === 2 && !isIndex) {
      const pages = directPagesByCourse.get(courseId) ?? [];
      pages.push(note);
      directPagesByCourse.set(courseId, pages);
      continue;
    }
    const chapters = chaptersByCourse.get(courseId) ?? new Map<string, RawChapter>();
    chaptersByCourse.set(courseId, chapters);
    const chapter: RawChapter = chapters.get(chapterName) ?? { pages: [] };
    chapters.set(chapterName, chapter);
    if (rest.length === 0) chapter.intro = note;
    else chapter.pages.push(note);
  }

  const trees = new Map<string, CourseTree>();
  for (const course of courses) {
    const courseChapters = chaptersByCourse.get(course.id) ?? new Map<string, RawChapter>();
    const directPages = directPagesByCourse.get(course.id);
    if (directPages) courseChapters.set('journeys', { pages: directPages });
    const rawChapters = [...courseChapters.entries()]
      .map(([name, ch]) => ({ name, ...ch, order: ch.intro?.data.order ?? prefixNumber(name) }))
      .sort(byOrder);

    const chapters: CourseChapter[] = rawChapters.map((raw, i) => {
      const chapter: CourseChapter = {
        id: `${course.id}/${raw.name}`,
        title: raw.intro?.data.title ?? humanize(raw.name),
        description: raw.intro?.data.description,
        number: i + 1,
        intro: raw.intro,
        pages: [],
      };
      chapter.pages = raw.pages
        .map((entry) => {
          const name = entry.id.split('/').slice(2).join('/');
          return { entry, name, order: entry.data.order ?? prefixNumber(name) };
        })
        .sort(byOrder)
        .map(({ entry }) => ({
          id: entry.id,
          title: entry.data.title,
          description: entry.data.description,
          entry,
          chapter,
        }));
      return chapter;
    });

    trees.set(course.id, { course, chapters, pages: chapters.flatMap((c) => c.pages) });
  }
  return trees;
}
