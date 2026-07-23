# Disclosure Boundaries

This public case study is designed for recruiters and engineering reviewers. It is not a source release and must not expose customer, infrastructure, or security-sensitive material.

## Safe to publish

- synthetic product screenshots;
- high-level architecture and data flow;
- generic technology choices;
- abstracted test categories;
- internal aggregate deployment evidence;
- role and ownership description;
- explicit maturity and authorization boundaries.

## Do not publish

- customer names, content, documents, or screenshots;
- credentials, secrets, tokens, keys, cookies, or environment values;
- host IDs, IP addresses, network topology, SSH material, or private URLs;
- database paths, operational identifiers, or raw incident evidence;
- concrete approval comments or evidence quotes;
- private commit hashes, workflow-run IDs, or deployment identifiers;
- unreleased commercial strategy;
- details that weaken operational security.

## Claims policy

Use precise maturity language:

- **implemented** means source exists and was reviewed;
- **tested** means named checks were executed against the relevant version;
- **deployed internally** does not mean customer pilot;
- **production-ready** is not used without the applicable release authority;
- **external pilot** and **customer outcome** claims require separate evidence.

## Screenshot checklist

Before adding any image:

1. use synthetic fixtures only;
2. inspect every visible string at full resolution;
3. remove names, emails, document text, IDs, URLs, and timestamps that reveal operations;
4. inspect browser chrome, terminal history, tabs, and notifications;
5. bind the screenshot description to what it actually proves.