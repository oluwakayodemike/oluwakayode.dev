---
title: "Software without a connection"
date: 2026-11-01
excerpt: "A small Python notes tool, a local SQLite file, and what still needs work before I would call it local-first."
tags: ["python", "local-first", "sqlite"]
sample: true
---

I use cloud storage a lot. Most of my data is backed up there: photos, files, folders, the works. It is convenient, and I am not about to pretend otherwise.

But it irks me how little control I actually have over all of it. What happens when I need a file and the service is down for some weird reason, especially in these AI times when every other week some big provider is having an incident? What about privacy? We have all seen the meme: there is no cloud, it is just someone else's computer. Funny because it is true.

[image:no-cloud-meme]

This is not just a theory for me. A while back I used a daily journaling app on my phone. Nothing fancy, just text and a few images. Then I realised my entries were stuck behind a paywall. I could not export them to use anywhere else, and there was no way to sync them to my own storage. A journaling app. Text and images. Somehow my own words were locked in, and the only way out was to pay. That felt wrong in a way I still think about.

That is what interests me about [local-first software](https://www.inkandswitch.com/local-first/).

## What is local-first, really?

Most apps today work like this: your phone or browser is just a window. The real app, and your data, lives on a server somewhere. Every tap sends a request and waits for an answer. No connection, no app.

Local-first flips that. The app runs on your device, and your data lives there too, in a file you could copy if you wanted to. Reading a note does not need a server to answer first, so everything is fast and works offline. A connection still helps, for syncing between devices or sharing with people, but it is a bonus, not a requirement.

The simple test: if the internet disappeared for a day, could you still read and edit your own stuff?

[diagram:local-first-sync]

I wanted to make that idea a little less abstract. When I am trying to get the fundamentals of something, I find it helps to start from the basics, and a small notes tool is about as basic as it gets. Save a note, read it back.

One distinction is worth making before any code. **Saving something locally does not make it a complete local-first app.** Ownership, backups, sharing, and what happens when two devices edit the same thing still matter. This example only covers the first bit: saving and reading notes on one machine, without a connection.

## Start with the part that should work offline

A notes tool that only works when the internet does fails the simple test from earlier. So the first job is the boring one: save notes on your own machine and read them back. Nothing else.

For storage I went with SQLite. It is a real database, but the whole thing lives in one file on your computer. No server, no account, nothing extra to install, because Python already ships with it as the [sqlite3 module](https://docs.python.org/3/library/sqlite3.html). You could throw every note into a JSON file, and for five notes that works fine. SQLite just copes better once there are hundreds, and it does not leave a half-written file behind if something crashes mid-save.

For now the tool only needs to do two things:

- Save a note with a title and some text.
- Read it back, even after I close the program.

Sync can wait. Get these two right first, then add the next moving piece.

### The code

Save this as `notes.py`. You need Python 3.10 or newer, and nothing else to install.

```python
import argparse
import sqlite3
from contextlib import closing
from datetime import datetime, timezone
from pathlib import Path

# one plain file on this machine, no server involved
DB_PATH = Path.home() / ".local-first-notes" / "notes.db"


def open_database(path: Path) -> sqlite3.Connection:
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path)
    # safe to run on every start, not just the first
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    connection.commit()
    return connection


def main() -> None:
    parser = argparse.ArgumentParser(description="Keep notes on this machine.")
    commands = parser.add_subparsers(dest="command", required=True)

    add = commands.add_parser("add")
    add.add_argument("title")
    add.add_argument("body")
    commands.add_parser("list")
    args = parser.parse_args()

    if args.command == "add" and not args.title.strip():
        parser.error("a note needs a title")

    with closing(open_database(DB_PATH)) as connection:
        if args.command == "add":
            created_at = datetime.now(timezone.utc).isoformat()
            # commits on success and rolls back if the insert fails
            with connection:
                cursor = connection.execute(
                    # note text stays out of the sql, so a stray quote cannot break it
                    "INSERT INTO notes (title, body, created_at) VALUES (?, ?, ?)",
                    (args.title.strip(), args.body, created_at),
                )
            print(f"Saved note {cursor.lastrowid}.")
        else:
            rows = connection.execute(
                "SELECT id, title, body FROM notes ORDER BY id DESC"
            ).fetchall()
            if not rows:
                print("No notes yet.")
            for note_id, title, body in rows:
                print(f"\n[{note_id}] {title}\n{body}")


if __name__ == "__main__":
    main()
```

### Try it

Open a terminal in the folder where you saved the file and add a note:

```bash
python notes.py add "An offline afternoon" "A few ideas, saved on my machine."
```

Then read it back:

```bash
python notes.py list
```

If that does not work, try `python3` instead of `python`. Some systems name it that way.

Now the fun part. Close the terminal, open a new one, and run the list command again. Your note is still there. Turn off your Wi-Fi and try both commands one more time. They still work, because nothing here ever needed the internet.

If you are curious where the note actually went, it is in a folder called `.local-first-notes` inside your home folder. The dot at the start hides it on most systems. It stays in that one place no matter which folder you run the script from.

## What is happening here?

If you have never touched a database before, these are the only lines that really matter.

`open_database()` makes the folder if it is missing, then `sqlite3.connect()` opens the database file, or creates it the first time. The `CREATE TABLE IF NOT EXISTS` part sets up a table called `notes`. Think of a table like a spreadsheet: every note is a row, and each row has an ID, a title, a body, and the time it was created.

The `?` marks in the insert line are worth slowing down for. The code never glues the note text straight into the SQL. The `?` marks are empty slots, and SQLite fills them in safely. So a title like `Mike's ideas` stays a title instead of breaking the query, and nobody can sneak their own SQL in through a note.

The inner `with connection:` saves the note if everything goes well and undoes it if something fails, so you never end up with half a note. It does not close the database though. That is what `closing()` on the outer block is for.

And that is the whole save-and-read path. No account, no API request, no server somewhere far away. Just a file on your machine that you can copy, back up, or open with another tool.

## The awkward bits are still there

This works, but it is a small offline tool, *not a finished notes app*. Before you trust it with anything important, a few things still need thought:

- **Backups:** local does not mean safe. Losing the device or deleting the file can still mean losing the notes. For this tiny version, you can copy the database while the tool is closed. A real app needs a proper backup process, such as SQLite's backup API.
- **Getting my notes out:** a SQLite file is readable with other tools, but an export to Markdown or plain text makes leaving much easier.
- **Failed writes:** a full disk or a folder you cannot write to should produce a useful error. This script still leaves that to Python's exception output.
- **Privacy:** the database is not encrypted. Anyone with access to the file may be able to read it.
- **Sync:** adding a second device introduces a different problem. If you edit the same note on both devices, which version wins? SQLite does not solve that on its own.

Later I might put a nicer interface on it with [Textual](https://textual.textualize.io/), or turn it into a desktop app. Neither changes the basic idea: your notes should stay useful on your machine before you ask a server to do anything with them.

For now, that is the part I want to get right. I write a note, close the tool, come back, and the note is still mine to read. The connection can wait.
