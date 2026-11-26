import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { posts } from "@/data/blogs";
import { ArticleBody } from "@/components/site/ArticleBody";
import { NoCloudMeme } from "@/components/site/NoCloudMeme";

const body = posts.find((post) => post.slug === "software-without-a-connection")?.body ?? "";

describe("no cloud meme", () => {
  it("sits directly after the paragraph that quotes the meme", () => {
    expect(body).toContain("Funny because it is true.\n\n[image:no-cloud-meme]");
  });

  it("credits the post the meme came from", () => {
    render(<NoCloudMeme />);
    expect(screen.getByRole("link", { name: "this post" })).toHaveAttribute(
      "href",
      "https://lnkd.in/p/emEstiy6",
    );
  });

  it("swaps the marker for the figure instead of printing the token", () => {
    render(<ArticleBody content={"[image:no-cloud-meme]"} />);
    expect(screen.getByRole("img", { name: /there is no cloud/i })).toBeInTheDocument();
    expect(screen.queryByText("[image:no-cloud-meme]")).toBeNull();
  });
});
