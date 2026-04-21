import { describe, expect, it } from "vitest";
import { siteData } from "../src/data/site";

describe("siteData", () => {
  it("provides homepage hero copy and project entries", () => {
    expect(siteData.home.hero.eyebrow).toBeTruthy();
    expect(siteData.home.hero.title).toBeTruthy();
    expect(siteData.home.hero.description).toBeTruthy();
    expect(siteData.projects.length).toBeGreaterThanOrEqual(3);
    expect(siteData.projects.every((project) => project.slug)).toBe(true);
  });

  it("provides about page sections and FAQ entries", () => {
    expect(siteData.about.intro).toBeTruthy();
    expect(siteData.about.whatIDo.length).toBeGreaterThanOrEqual(3);
    expect(siteData.about.milestones.length).toBeGreaterThanOrEqual(3);
    expect(siteData.about.faq.length).toBeGreaterThanOrEqual(3);
  });

  it("provides detail data for featured project pages", () => {
    expect(
      siteData.projects.filter((project) => project.kind === "detail").length,
    ).toBeGreaterThanOrEqual(3);
    expect(
      siteData.projects
        .filter((project) => project.kind === "detail")
        .every((project) => project.detail?.summary && project.detail?.points.length),
    ).toBe(true);
  });

  it("provides direct contact info and social handles", () => {
    expect(siteData.contact.emailLabel).toBe("idnnnnnnn@gmail.com");
    expect(siteData.contact.wechatLabel).toBe("-iDnnnnnnn");
    expect(siteData.channels.length).toBeGreaterThanOrEqual(2);
    expect(siteData.channels.some((channel) => channel.title.includes("抖音"))).toBe(true);
    expect(siteData.channels.some((channel) => channel.title.includes("小红书"))).toBe(true);
  });
});
