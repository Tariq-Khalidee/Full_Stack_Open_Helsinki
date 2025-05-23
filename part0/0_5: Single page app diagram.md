
```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Navigate to /spa
    Browser->>Server: GET /spa
    Server-->>Browser: Respond with HTML, JS, CSS

    note right of Browser: Browser loads the SPA shell

    Browser->>Server: GET /data.json
    note right of Server: Returns all saved notes in JSON format

    Server-->>Browser: JSON response with notes

    note right of Browser: JS renders the notes<br>into the DOM dynamically

    Browser-->>User: Shows interactive notes UI without page reload
```