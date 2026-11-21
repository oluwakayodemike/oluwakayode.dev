// all site content lives here.
const nslookupResult = { url: "/media/mongodb-nslookup-srv-result.webp" };
const terminalError = { url: "/media/mongodb-querysrv-terminal-error.webp" };
const connectedSuccess = { url: "/media/mongodb-connected-successfully.webp" };

export const profile = {
  name: "Michael Kayode Oluwasegun",
  metaName: "Michael K.O",
  brand: "mko.",
  alternateNames: ["mko", "Michael Oluwasegun"],
  short: "Michael",
  role: "Developer & Financial Analyst",
  location: "Lagos, NG",
  timezone: "Africa/Lagos",
  initials: "MKO",
  email: "michaelaykay@gmail.com",
  github: "oluwakayodemike",
  links: {
    github: "https://github.com/oluwakayodemike",
    linkedin: "https://www.linkedin.com/in/oluwakayodemike",
    x: "https://x.com/trulymko",
    resume: "#", // todo
  },
  quote: {
    text: "Compound interest is the eighth wonder of the world.",
    by: "Attributed to Albert Einstein",
  }, // todo
};

// intro paragraphs. "{{name}}" is swapped for profile.name when rendered.
export const intro = [
  "I'm {{name}}, a student at the Federal University of Technology, Akure. I split my time between building software and learning how money works.",
  "On the building side, I care about things that hold up: solid, scalable products that feel effortless to use and stay fast. Lately I've been exploring local-first tools and what they could change about how software gets made.",
  "On the money side, I do equity research. I dig through annual reports, keep up with business news, and try to work out what a company is actually worth. I get a little sharper with every one I read.",
  "Off the clock, I play chess, do sudoku, and doomscroll far more than I should.",
];

export type Category = "Dev" | "Finance" | "Both";
export type Project = {
  name: string;
  year: string;
  tagline: string;
  description: string;
  category: Category;
  tags: string[];
  metrics: { label: string; value: string }[];
  /** leave out to get a generated cover from the name and tagline. */
  image?: string;
  imageSrcSet?: string;
  live?: string;
  repo?: string;
  featured?: boolean;
  /** url of a demo video, e.g. a hackathon walkthrough. */
  demo?: string;
  /** shows a corner "wip" ribbon on the cover. */
  wip?: boolean;
};

const projectList: Project[] = [
  {
    name: "BIAD Store",
    year: "2026",
    tagline: "The official online store for a Lagos streetwear brand",
    category: "Dev",
    featured: true,
    live: "https://biad.store/",
    description:
      "A freelance build I took from zero to launch. It handles the whole journey: browsing the drops, paying securely through Paystack, and getting orders out the door.",
    tags: ["Next.js", "TypeScript", "Sanity", "Paystack", "Resend", "Redis"],
    metrics: [],
  },
  {
    name: "ARIA",
    year: "2026",
    tagline: "An autonomous agent that finds and closes Splunk detection gaps",
    category: "Dev",
    featured: true,
    repo: "https://github.com/oluwakayodemike/ARIA",
    demo: "https://www.youtube.com/watch?v=e8mCmHSdUs0",
    description:
      "Built for the Splunk Agentic Ops Hackathon 2026. Security teams usually know their detection gaps but closing them is slow. ARIA audits Splunk coverage against MITRE ATT&CK, generates SPL detections with AI, validates them against Splunk, and stages them for human approval before deployment.",
    tags: [
      "Python",
      "FastAPI",
      "Splunk",
      "MITRE ATT&CK",
      "Gemini",
      "React",
      "Vite",
      "Tailwind CSS",
    ],
    metrics: [],
  },
  {
    name: "ReuniteAI",
    year: "2025",
    tagline: "A campus lost-and-found platform that matches photos and checks ownership claims",
    category: "Dev",
    featured: true,
    repo: "https://github.com/oluwakayodemike/ReuniteAI",
    description:
      "I built ReuniteAI to help students find lost belongings without digging through campus group chats. It compares photos with CLIP embeddings and descriptions with TiDB search to find likely matches. Kimi reviews ownership claims, with Gemini as a fallback, and approved claims get a pickup code. Students can track their reports and get notifications when a possible match turns up.",
    tags: [
      "JavaScript",
      "Node.js",
      "Express",
      "OpenAI CLIP",
      "BentoML",
      "Kimi AI",
      "Gemini",
      "TiDB",
      "Clerk",
      "Cloudinary",
    ],
    metrics: [],
  },
  {
    name: "EnDe-Crypt",
    year: "2023",
    tagline: "A command-line tool that locks local files behind a key",
    category: "Dev",
    featured: true,
    repo: "https://github.com/oluwakayodemike/EnDe-Crypt",
    description:
      "One of the first things I built that I still stand by. You point it at a file, it encrypts the contents with Fernet and leaves the file format untouched, then hands you a key you have to look after yourself. Put the key back in and the file comes back exactly as it was.",
    tags: ["Python", "cryptography", "Fernet", "CLI"],
    metrics: [],
  },
  {
    name: "Term Mail",
    year: "2026",
    tagline: "Gmail from the terminal, with AI drafts on the way",
    category: "Dev",
    featured: true,
    wip: true,
    repo: "https://github.com/oluwakayodemike/term-mail",
    description:
      "A work in progress. It talks to Gmail through the API, and I'm still building out the basics: viewing and reading mail properly from the command line, with a Textual interface you can move through with the keyboard. The part I'm most excited about is still ahead of me: telling an AI to draft a reply for you, right there in the terminal.",
    tags: ["Python", "Gmail API", "Textual", "CLI", "OAuth"],
    metrics: [],
  },
];

// curated order: newest first, with the oldest project last.
export const projects = [...projectList].sort((a, b) => {
  const order = ["BIAD Store", "ARIA", "Term Mail", "ReuniteAI", "EnDe-Crypt"];
  return order.indexOf(a.name) - order.indexOf(b.name);
});

export const toolkit = [
  { label: "Languages", icon: "braces", items: ["Python", "JavaScript", "TypeScript", "Go", "C"] },
  {
    label: "Frameworks",
    icon: "layers",
    items: ["Node.js", "Express", "Next.js", "React", "Tailwind CSS"],
  },
  { label: "Data", icon: "database", items: ["MySQL", "MongoDB", "Redis", "TiDB"] },
  {
    label: "Everyday tools",
    icon: "wrench",
    items: [
      "Git",
      "GitHub",
      "Zed",
      "VS Code",
      "Postman",
      "Figma",
      "Excalidraw",
      "Vercel",
      "Linux",
      "Excel",
    ],
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  paragraphs: string[];
  /** optional markdown body. links use [label](https://url), inline code uses backticks. */
  body?: string;
  /** url of this article's medium cross-post, when available. */
  mediumUrl?: string;
  /** optional handmade share card, e.g. "/og/my-post.jpg". leave out to use the automatic card. */
  ogImage?: string;
  /** small topic chips shown under the title, e.g. ["python", "rant"]. */
  tags?: string[];
  sample?: boolean;
};

// the local-first piece remains a draft until michael approves it for publication.
export const posts: Post[] = [
  {
    slug: "software-without-a-connection",
    title: "Software without a connection",
    date: "2026-11-01",
    excerpt:
      "A small Python notes tool, a local SQLite file, and what still needs work before I would call it local-first.",
    tags: ["python", "local-first", "sqlite"],
    sample: true,
    paragraphs: [],
    body: 'I use cloud storage a lot. Most of my data is backed up there: photos, files, folders, the works. It is convenient, and I am not about to pretend otherwise.\n\nBut it irks me how little control I actually have over all of it. What happens when I need a file and the service is down for some weird reason, especially in these AI times when every other week some big provider is having an incident? What about privacy? We have all seen the meme: there is no cloud, it is just someone else\'s computer. Funny because it is true.\n\n[image:no-cloud-meme]\n\nThis is not just a theory for me. A while back I used a daily journaling app on my phone. Nothing fancy, just text and a few images. Then I realised my entries were stuck behind a paywall. I could not export them to use anywhere else, and there was no way to sync them to my own storage. A journaling app. Text and images. Somehow my own words were locked in, and the only way out was to pay. That felt wrong in a way I still think about.\n\nThat is what interests me about [local-first software](https://www.inkandswitch.com/local-first/).\n\n## What is local-first, really?\n\nMost apps today work like this: your phone or browser is just a window. The real app, and your data, lives on a server somewhere. Every tap sends a request and waits for an answer. No connection, no app.\n\nLocal-first flips that. The app runs on your device, and your data lives there too, in a file you could copy if you wanted to. Reading a note does not need a server to answer first, so everything is fast and works offline. A connection still helps, for syncing between devices or sharing with people, but it is a bonus, not a requirement.\n\nThe simple test: if the internet disappeared for a day, could you still read and edit your own stuff?\n\n[diagram:local-first-sync]\n\nI wanted to make that idea a little less abstract. When I am trying to get the fundamentals of something, I find it helps to start from the basics, and a small notes tool is about as basic as it gets. Save a note, read it back.\n\nOne distinction is worth making before any code. **Saving something locally does not make it a complete local-first app.** Ownership, backups, sharing, and what happens when two devices edit the same thing still matter. This example only covers the first bit: saving and reading notes on one machine, without a connection.\n\n## Start with the part that should work offline\n\nA notes tool that only works when the internet does fails the simple test from earlier. So the first job is the boring one: save notes on your own machine and read them back. Nothing else.\n\nFor storage I went with SQLite. It is a real database, but the whole thing lives in one file on your computer. No server, no account, nothing extra to install, because Python already ships with it as the [sqlite3 module](https://docs.python.org/3/library/sqlite3.html). You could throw every note into a JSON file, and for five notes that works fine. SQLite just copes better once there are hundreds, and it does not leave a half-written file behind if something crashes mid-save.\n\nFor now the tool only needs to do two things:\n\n- Save a note with a title and some text.\n- Read it back, even after I close the program.\n\nSync can wait. Get these two right first, then add the next moving piece.\n\n### The code\n\nSave this as `notes.py`. You need Python 3.10 or newer, and nothing else to install.\n\n```python\nimport argparse\nimport sqlite3\nfrom contextlib import closing\nfrom datetime import datetime, timezone\nfrom pathlib import Path\n\n# one plain file on this machine, no server involved\nDB_PATH = Path.home() / ".local-first-notes" / "notes.db"\n\n\ndef open_database(path: Path) -> sqlite3.Connection:\n    path.parent.mkdir(parents=True, exist_ok=True)\n    connection = sqlite3.connect(path)\n    # safe to run on every start, not just the first\n    connection.execute(\n        """\n        CREATE TABLE IF NOT EXISTS notes (\n            id INTEGER PRIMARY KEY,\n            title TEXT NOT NULL,\n            body TEXT NOT NULL,\n            created_at TEXT NOT NULL\n        )\n        """\n    )\n    connection.commit()\n    return connection\n\n\ndef main() -> None:\n    parser = argparse.ArgumentParser(description="Keep notes on this machine.")\n    commands = parser.add_subparsers(dest="command", required=True)\n\n    add = commands.add_parser("add")\n    add.add_argument("title")\n    add.add_argument("body")\n    commands.add_parser("list")\n    args = parser.parse_args()\n\n    if args.command == "add" and not args.title.strip():\n        parser.error("a note needs a title")\n\n    with closing(open_database(DB_PATH)) as connection:\n        if args.command == "add":\n            created_at = datetime.now(timezone.utc).isoformat()\n            # commits on success and rolls back if the insert fails\n            with connection:\n                cursor = connection.execute(\n                    # note text stays out of the sql, so a stray quote cannot break it\n                    "INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)",\n                    (args.title.strip(), args.body, created_at),\n                )\n            print(f"Saved note {cursor.lastrowid}.")\n        else:\n            rows = connection.execute(\n                "SELECT id, title, body FROM notes ORDER BY id DESC"\n            ).fetchall()\n            if not rows:\n                print("No notes yet.")\n            for note_id, title, body in rows:\n                print(f"\\n[{note_id}] {title}\\n{body}")\n\n\nif __name__ == "__main__":\n    main()\n```\n\n### Try it\n\nOpen a terminal in the folder where you saved the file and add a note:\n\n```bash\npython notes.py add "An offline afternoon" "A few ideas, saved on my machine."\n```\n\nThen read it back:\n\n```bash\npython notes.py list\n```\n\nIf that does not work, try `python3` instead of `python`. Some systems name it that way.\n\nNow the fun part. Close the terminal, open a new one, and run the list command again. Your note is still there. Turn off your Wi-Fi and try both commands one more time. They still work, because nothing here ever needed the internet.\n\nIf you are curious where the note actually went, it is in a folder called `.local-first-notes` inside your home folder. The dot at the start hides it on most systems. It stays in that one place no matter which folder you run the script from.\n\n## What is happening here?\n\nIf you have never touched a database before, these are the only lines that really matter.\n\n`open_database()` makes the folder if it is missing, then `sqlite3.connect()` opens the database file, or creates it the first time. The `CREATE TABLE IF NOT EXISTS` part sets up a table called `notes`. Think of a table like a spreadsheet: every note is a row, and each row has an ID, a title, a body, and the time it was created.\n\nThe `?` marks in the insert line are worth slowing down for. The code never glues the note text straight into the SQL. The `?` marks are empty slots, and SQLite fills them in safely. So a title like `Mike\'s ideas` stays a title instead of breaking the query, and nobody can sneak their own SQL in through a note.\n\nThe inner `with connection:` saves the note if everything goes well and undoes it if something fails, so you never end up with half a note. It does not close the database though. That is what `closing()` on the outer block is for.\n\nAnd that is the whole save-and-read path. No account, no API request, no server somewhere far away. Just a file on your machine that you can copy, back up, or open with another tool.\n\n## The awkward bits are still there\n\nThis works, but it is a small offline tool, *not a finished notes app*. Before you trust it with anything important, a few things still need thought:\n\n- **Backups:** local does not mean safe. Losing the device or deleting the file can still mean losing the notes. For this tiny version, you can copy the database while the tool is closed. A real app needs a proper backup process, such as SQLite\'s backup API.\n- **Getting my notes out:** a SQLite file is readable with other tools, but an export to Markdown or plain text makes leaving much easier.\n- **Failed writes:** a full disk or a folder you cannot write to should produce a useful error. This script still leaves that to Python\'s exception output.\n- **Privacy:** the database is not encrypted. Anyone with access to the file may be able to read it.\n- **Sync:** adding a second device introduces a different problem. If you edit the same note on both devices, which version wins? SQLite does not solve that on its own.\n\nLater I might put a nicer interface on it with [Textual](https://textual.textualize.io/), or turn it into a desktop app. Neither changes the basic idea: your notes should stay useful on your machine before you ask a server to do anything with them.\n\nFor now, that is the part I want to get right. I write a note, close the tool, come back, and the note is still mine to read. The connection can wait.',
  },
  {
    slug: "fixing-mongodb-querysrv-econnrefused",
    title: "Fixing the MongoDB 'querySrv ECONNREFUSED' nightmare on localhost",
    date: "2026-02-01",
    excerpt:
      "MongoDB Atlas kept refusing to connect, and the problem turned out to be DNS, not my code. Here is how I fixed it.",
    tags: ["mongodb", "node.js", "error", "fix"],
    mediumUrl:
      "https://medium.com/@michaelaykay/fixing-the-mongodb-querysrv-econnrefused-nightmare-on-localhost-fe17bf7f1092",
    paragraphs: [],
    body: `There is a higher chance your code is fine if you are trying to connect to MongoDB Atlas and it keeps hitting you with \`querySrv ECONNREFUSED\`.

> **Update (February 2, 2026): root cause found.** Since publishing this, it has been discovered that this error specifically affects Node.js v22+ on Windows, caused by Node not correctly using the system DNS resolver.

If you are on this specific stack, there is a one-line code fix discovered by the community (credit to this [StackOverflow](https://stackoverflow.com/questions/79873598/mongodb-atlas-srv-connection-fails-with-querysrv-econnrefused-after-switching-no) question):

\`\`\`js
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
\`\`\`

However, if you are on an older Node version, or prefer not to hardcode DNS servers in your application code, the solution below (manually constructing the standard URI) remains the most robust way to bypass DNS issues entirely.

## The problem

I encountered this error while trying to spin up my server and connect to my MongoDB database. The error is basically saying "your server is not failing to connect to the database; it is failing to connect to the DNS system to ask where the database is".

According to my research, this can be caused by DNS blocking, strict firewalls, or just a slow internet connection. Some blogs suggest whitelisting your IP address on MongoDB Atlas (I even tried whitelisting \`0.0.0.0/0\` out of desperation, please do not do this).

After surfing the internet for hours, the common suggestions were:

1. **Switch to a public DNS:** change your DNS to Google (\`8.8.8.8\`) or Cloudflare (\`1.1.1.1\`).
2. **Flush your DNS:** run this to clear your local DNS resolver cache.

\`\`\`bash
ipconfig /flushdns # run cmd as administrator first
\`\`\`

3. **Test to check if it has been resolved.**

\`\`\`bash
ping _mongodb._tcp.test.egxt9uu.mongodb.net
\`\`\`

If after this it resolves back to an IP address, congrats!

> Other things you can try: resetting your router (it might be an internet service provider issue), or double-checking your connection string.

## Switching to the standard URI

The most reliable fix I found is switching back to the standard connection string. This is the one starting with \`mongodb://\` instead of \`mongodb+srv://\`.

The problem is, the \`+srv\` connection string is recommended because it automatically handles failover and service discovery. Finding the standard URI requires a bit of technicality, as it appears to be completely hidden on the Atlas connection interface.

### How to get the standard URI

To construct the standard string, we need to find the actual server addresses hidden behind that short \`+srv\` URL. We can do this using the terminal.

When your server crashes, you are probably getting an error like this:

\`\`\`text
Error: querySrv ECONNREFUSED _mongodb._tcp.test.egxt9uu.mongodb.net
\`\`\`

![A snip from my terminal showing the complete error message while trying to connect to my database](${terminalError.url})

That hostname in the error message is exactly what we need. We are going to perform an \`nslookup\` with the \`SRV\` flag to ask the DNS server, "where is the database actually located?"

\`\`\`bash
nslookup -type=SRV _mongodb._tcp.test.egxt9uu.mongodb.net
# replace the hostname with the one from your specific error message
\`\`\`

![Running nslookup with the SRV flag on my MongoDB hostname](${nslookupResult.url})

From the result we have literally gotten everything we need for our construction, everything the \`+srv\` string was hiding. There are 3 hidden servers, and now we have their real names (\`shard-00\`, \`01\`, and \`02\`) and their port (\`27017\`).

\`\`\`text
svr hostname = ac-mvh7i5b-shard-00-00.egxt9uu.mongodb.net
svr hostname = ac-mvh7i5b-shard-00-01.egxt9uu.mongodb.net
svr hostname = ac-mvh7i5b-shard-00-02.egxt9uu.mongodb.net
\`\`\`

## The construction

With those details, we can piece the connection string together manually.

- **Protocol:** change \`mongodb+srv://\` to \`mongodb://\`
- **Auth:** add your credentials (\`username:password@\`)
- **Host:** list every server hostname we got from the \`nslookup\`, separated by commas, and add the port (\`:27017\`) to each one.
- **Database:** add the database name with a forward slash (e.g. \`/test\`).
- **Options:** append the standard options at the end: \`?ssl=true&authSource=admin&retryWrites=true&w=majority\`

### The skeleton

\`\`\`text
mongodb://USER:PASS@HOST1:PORT,HOST2:PORT,HOST3:PORT/DB_NAME?OPTIONS
\`\`\`

### The final result

\`\`\`text
mongodb://<username>:<password>@ac-mvh7i5b-shard-00-00.egxt9uu.mongodb.net:27017,ac-mvh7i5b-shard-00-01.egxt9uu.mongodb.net:27017,ac-mvh7i5b-shard-00-02.egxt9uu.mongodb.net:27017/test?ssl=true&authSource=admin&retryWrites=true&w=majority
\`\`\`

And voilà! You should be able to successfully connect to your database without the DNS headaches. 🎉

![Connected to MongoDB successfully](${connectedSuccess.url})`,
  },
];

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
