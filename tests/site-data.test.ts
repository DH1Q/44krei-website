import { describe, expect, it } from "vitest";
import { siteData } from "../src/data/site";

describe("siteData", () => {
  it("provides homepage hero copy", () => {
    expect(siteData.home.hero.eyebrow).toBeTruthy();
    expect(siteData.home.hero.title).toBeTruthy();
    expect(siteData.home.hero.description).toBeTruthy();
  });

  it("provides about page sections and FAQ entries", () => {
    expect(siteData.about.intro).toBeTruthy();
    expect(siteData.about.whatIDo.length).toBeGreaterThanOrEqual(3);
    expect(siteData.about.milestones.length).toBeGreaterThanOrEqual(3);
    expect(siteData.about.faq.length).toBeGreaterThanOrEqual(3);
  });

  it("keeps labels for the homepage sections", () => {
    expect(siteData.home.projectsTitle).toBeTruthy();
    expect(siteData.home.skillHubTitle).toBe("Skill 库");
    expect(siteData.home.journeyTitle).toBeTruthy();
    expect(siteData.home.channelsTitle).toBeTruthy();
    expect(siteData.home.contactTitle).toBeTruthy();
  });

  it("keeps homepage shortcuts for the skill hub and Krei MD", () => {
    expect(siteData.home.skillHubLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Skill 库",
          href: "/skills",
        }),
        expect.objectContaining({
          title: "Krei MD",
          href: "/projects/krei-md/",
        }),
      ]),
    );
  });

  it("provides direct contact info and social handles", () => {
    expect(siteData.contact.emailLabel).toBe("idnnnnnnn@gmail.com");
    expect(siteData.contact.wechatLabel).toBe("-iDnnnnnnn");
    expect(siteData.channels.length).toBeGreaterThanOrEqual(2);
    expect(siteData.channels.some((channel) => channel.title.includes("抖音"))).toBe(true);
    expect(siteData.channels.some((channel) => channel.title.includes("小红书"))).toBe(true);
  });
});
