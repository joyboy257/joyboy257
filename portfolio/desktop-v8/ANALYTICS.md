# Portfolio analytics — recruiter funnel
**Project:** `deon-desktop-portfolio` (`prj_NX88JqGzfUTOzvaTAQV73pwHWo7c`)
**Production URL:** https://deon-desktop-portfolio.vercel.app/
**Deployment:** Update the EXISTING Vercel project only; do not create another project.

## One-time activation

Vercel Web Analytics needs to be enabled on the project from **Vercel → deon-desktop-portfolio → Analytics → Enable**. The Vercel connector available in this workspace does not expose the enable action; adding the script alone is insufficient. **Redeploy the existing project after enabling Analytics** so the Vercel analytics script route is mounted. A 404 on `/_vercel/insights/script.js` generally means activation or redeployment is missing.

Dashboard: https://vercel.com/deonaqwx-9156s-projects/deon-desktop-portfolio/analytics

## What to measure

| Question | Dashboard breakdown | Interpretation |
|---|---|---|
| How many people visited? | Visitors and Views | Anonymous visitors and total page views |
| Are people arriving via my CV? | Pages → `/from/resume` | Visits to CV-specific link, *not* independently verified recruiters |
| Are job application links working? | Pages → `/from/applications` | Visits to application-specific link |
| Are LinkedIn and outreach driving traffic? | Pages → `/from/linkedin` and `/from/outreach`; Referrers | Visitors arriving through those links; referrer may be missing |
| What technical work drew attention? | Pages → `/projects/{id}` (virtual view) | Case files viewed; counts clicks, not endorsements |
| Do visitors open the recruiter brief or outbound links? | Events (Pro/Enterprise) | `Recruiter brief opened`, `Outbound link clicked`, etc. |

## Attribution links (use these, not the plain homepage, in each channel)

- Resume or PDF CV: https://deon-desktop-portfolio.vercel.app/from/resume
- Applications / ATS portals: https://deon-desktop-portfolio.vercel.app/from/applications
- LinkedIn profile: https://deon-desktop-portfolio.vercel.app/from/linkedin
- Direct recruiter outreach emails/messages: https://deon-desktop-portfolio.vercel.app/from/outreach
- GitHub profile: https://deon-desktop-portfolio.vercel.app/from/github

These paths are Vercel **rewrites** to the same `index.html`, so visitors still see the entire site. The pathname stays visible for anonymous source-category reporting on Vercel Analytics plans that show Pages, without needing paid UTM filtering. `<base href="/">` keeps JS/CSS/SVG references correct on nested paths.

Do not generate a unique link for an individual recruiter; this is aggregate traffic monitoring, not person-level surveillance.

## Events and privacy

- Automatic Vercel anonymous view counter runs after Analytics activation.
- `analytics.js` sends `Portfolio unlocked`, `Project opened`, `App opened`, `Recruiter brief opened`, `Outbound link clicked`, `Project search opened`, and `Application link arrival`.
- Custom events in Vercel's dashboard require a **Pro or Enterprise** subscription; these calls do not replace Web Analytics activation.
- On supported scripts, opening a project emits a **single virtual page view** under `/projects/<id>` per project per page load, and custom click events are still sent each time.
- The tracking code captures no personally identifying information, search queries, email addresses, fingerprints, session replay, or advertising cookies. It sends predefined project/app IDs and outbound site categories only.
- The `beforeSend` hook removes all query parameters and fragments, avoiding accidental disclosure of sensitive links.
- To test without counting a visit yourself, use `?no_analytics=1` (it disables both automatic analytics and custom events in that tab).
- Views can be lost to content blockers, privacy tools, network failures, or the script not being enabled. Aggregate analytics cannot determine whether any given visitor is a recruiter.
- The site's About pane discloses anonymous analytics.

## Operational QA

1. Confirm existing project ID is unchanged.
2. Enable Web Analytics; redeploy this exact set of static files and vercel.json.
3. Check `/_vercel/insights/script.js` returns the tracker, not 404.
4. Open site in a fresh browser context; in DevTools Network confirm `/_vercel/insights/view` or the Vercel-provisioned path receives a view.
5. Open `/from/resume` and `/from/applications` and confirm correct portfolio rendering and path visibility.
6. Visit Mirai and confirm its `/projects/mirai` virtual view appears if manual pageviews are supported.
7. If on Pro/Enterprise, confirm Projects/Brief/Outbound custom events.
8. Wait for Vercel dashboard ingestion and compare anonymous visit totals with link-source counts; do not label all traffic as recruiters.

## Notes
Sources:
- https://vercel.com/docs/analytics/quickstart
- https://vercel.com/docs/analytics/using-web-analytics
- https://vercel.com/docs/analytics/custom-events
- https://vercel.com/docs/analytics/privacy-policy
