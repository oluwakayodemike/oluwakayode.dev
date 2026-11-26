"""execute the exact python example embedded in the article, in a temporary home."""
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest


class LocalFirstExample(unittest.TestCase):
    def test_notes_survive_separate_processes_and_handle_quotes(self):
        source = Path(__file__).parents[1] / "data" / "blogs" / "software-without-a-connection.md"
        article = source.read_text()
        code = article.split("```python\n", 1)[1].split("```", 1)[0]
        with tempfile.TemporaryDirectory() as folder:
            script = Path(folder) / "notes.py"
            script.write_text(code)
            env = {**os.environ, "HOME": folder, "USERPROFILE": folder}

            def run(*args):
                return subprocess.run([sys.executable, str(script), *args], env=env,
                                      capture_output=True, text=True)

            empty = run("list")
            self.assertEqual(empty.returncode, 0)
            self.assertIn("No notes yet.", empty.stdout)
            saved = run("add", "Michael's offline note", "Saved without a server.")
            self.assertEqual(saved.returncode, 0, saved.stderr)
            self.assertIn("Saved note 1.", saved.stdout)
            read = run("list")
            self.assertEqual(read.returncode, 0, read.stderr)
            self.assertIn("[1] Michael's offline note\nSaved without a server.", read.stdout)
            self.assertTrue((Path(folder) / ".local-first-notes" / "notes.db").is_file())
            rejected = run("add", "   ", "Must not be saved")
            self.assertNotEqual(rejected.returncode, 0)
            self.assertNotIn("Must not be saved", run("list").stdout)


if __name__ == "__main__":
    unittest.main()