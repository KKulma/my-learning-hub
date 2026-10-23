Course link: https://www.linkedin.com/learning/build-with-ai-sql-ai-agents-in-production/build-a-sql-ai-agent-for-production

GitHub repo link: https://github.com/LinkedInLearning/build-with-ai-safe-and-scalable-sql-ai-agents-2757076

`ibis` - Python library for managing and running SQL commands on different servers / DB types (postgres, DuckDB, etc.)

`SQLglot` - Python library for validating // parsing  SQL queries


## SQL VALIDATION

    - Passes (returns True) when the user query follows read-only patterns, e.g. SELECT, DISPLAY, WITH, etc. 
    - It fails if the query contains destructive actions, e.g. DROP, DELETE -- see 03_03b notebook


## SAFETY CONSTRAINS
    - Safety and performance guardrail controlling how much data can be returned to the user
    - See example of ensure_limit() function in 03_04b notebook.HOWEVER, mind that this function automatically adds LIMIT statement to the query if it doesn't have one already, so this could affect UX (we'd need to communicate this limit in the app)



## DEBUGGER AGENT

Debugger AI Agent is triggered on DB Handler's error where we make a API call to LLM with the following context:
    - User Question
    - Failed Query
    - Error Message
    - Table Schema

And we let the agent follow the standard loop with the corrected SQL query based on the above context. 

Providing the debugging history is critical here!


## MODEL FALLBACK STRATEGY


    - Set the max number of iterations for debugger agent attempts
    - Consider implementing a fallback model: e.g. after exhausting max attempts, fallback to a more powerful model
    - Consider performance VS cost tradeoff
    - Model selection: build representative unit tests and test them on various models and pick the one that solves most generic cases for the default one and the one that better solves edge cases as a fallback model 

## OBSERVABILITY

    - An ability to observe how the system behaves (in production) by examining the signals it produces - not just what went wrong but also why
    - Logging - raw evidence 
    - Monitoring - aggregates and tracks system performance   

## DESIGINING A LOGGING SYSTEM

### LOG TYPES
    - Error and exception errors 
    - Query execution logs (SQL queries generated and executed by the agent)
    - Agent decision and reasoning logs
    - Performance and resource logs - execution times, latency metrics, db connection pool status, model metadata, etc. 
    - Audit and schema logs - user actions, db schemas, etc. 

## DESIGNING A MONITORIGN DASHBOARD - It focuses on system behaviour over time 

    - Availability and reliability metrics
    - Performance metrics
    - Usage and loaf metrics
    - Model-specific KPIs (token usage, cost, model selection distribution, etc.)
    - Debugger and recovery metrics - how often problems occur and how often the debugger agent resolves them

## ALERTING STRATEGIES 

    - Resource Availability
Unexpected spikes in: 
    - Error rate 
    - Latency
    - Usage and cost 

Better to define the meaningful thresholds that failures hit withing the defined time window and not on individual failures
