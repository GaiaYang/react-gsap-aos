"use client";

import React from "react";
import { toAOSProps } from "react-gsap-aos";
import { animations } from "react-gsap-aos/constants";

import useDynamicOptions from "./useDynamicOptions";

import AnchorPlacementMarker from "@/components/animtaion-panel/AnchorPlacementMarker";

const contents: React.ReactNode[] = [
  <p key={0}>
    Until now, trying to style an article, document, or blog post with Tailwind
    has been a tedious task that required a keen eye for typography and a lot of
    complex custom CSS.
  </p>,
  <p key={1}>
    By default, Tailwind removes all of the default browser styling from
    paragraphs, headings, lists and more. This ends up being really useful for
    building application UIs because you spend less time undoing user-agent
    styles, but when you really are just trying to style some content that came
    from a rich-text editor in a CMS or a markdown file, it can be surprising
    and unintuitive.
  </p>,
  <p key={2}>
    We get lots of complaints about it actually, with people regularly asking us
    things like:
  </p>,
  <blockquote key={3}>
    <p>
      Why is Tailwind removing the default styles on my <code>h1</code>{" "}
      elements? How do I disable this? What do you mean I lose all the other
      base styles too?
    </p>
  </blockquote>,
  <p key={4}>
    We hear you, but we&apos;re not convinced that simply disabling our base
    styles is what you really want. You don&apos;t want to have to remove
    annoying margins every time you use a <code>p</code> element in a piece of
    your dashboard UI. And I doubt you really want your blog posts to use the
    user-agent styles either — you want them to look <em>awesome</em>, not
    awful.
  </p>,
  <p key={5}>
    The <code>@tailwindcss/typography</code> plugin is our attempt to give you
    what you <em>actually</em> want, without any of the downsides of doing
    something stupid like disabling our base styles.
  </p>,
  <p key={6}>
    It adds a new <code>prose</code> class that you can slap on any block of
    vanilla HTML content and turn it into a beautiful, well-formatted document:
  </p>,
  <pre key={7}>
    <code>
      {`<article class="prose">
  <h1>Garlic bread with cheese: What the science tells us</h1>
  <p>
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  </p>
  <p>
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  </p>
  <!-- ... -->
</article>`}
    </code>
  </pre>,
  <p key={8}>
    For more information about how to use the plugin and the features it
    includes,{" "}
    <a
      href="https://github.com/tailwindcss/typography/blob/master/README.md"
      target="_blank"
    >
      read the documentation
    </a>
    .
  </p>,
  <h2 key={9}>What to expect from here on out</h2>,
  <p key={10}>
    What follows from here is just a bunch of absolute nonsense I&apos;ve
    written to dogfood the plugin itself. It includes every sensible typographic
    element I could think of, like <strong>bold text</strong>, unordered lists,
    ordered lists, code blocks, block quotes, <em>and even italics</em>.
  </p>,
  <p key={11}>
    It&apos;s important to cover all of these use cases for a few reasons:
  </p>,
  <ol key={12}>
    <li>We want everything to look good out of the box.</li>
    <li>
      Really just the first reason, that&apos;s the whole point of the plugin.
    </li>
    <li>
      Here&apos;s a third pretend reason though a list with three items looks
      more realistic than a list with two items.
    </li>
  </ol>,
  <p key={13}>Now we&apos;re going to try out another header style.</p>,
  <h3 key={14}>Typography should be easy</h3>,
  <p key={15}>
    So that&apos;s a header for you — with any luck if we&apos;ve done our job
    correctly that will look pretty reasonable.
  </p>,
  <p key={16}>Something a wise person once told me about typography is:</p>,
  <blockquote key={17}>
    <p>
      Typography is pretty important if you don&apos;t want your stuff to look
      like trash. Make it good then it won&apos;t be bad.
    </p>
  </blockquote>,
  <p key={18}>
    It&apos;s probably important that images look okay here by default as well:
  </p>,
  <figure key={19}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
      alt=""
    />
    <figcaption>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has
      roots in a piece of classical Latin literature from 45 BC, making it over
      2000 years old.
    </figcaption>
  </figure>,
  <p key={20}>
    Now I&apos;m going to show you an example of an unordered list to make sure
    that looks good, too:
  </p>,
  <ul key={21}>
    <li>So here is the first item in this list.</li>
    <li>In this example we&apos;re keeping the items short.</li>
    <li>Later, we&apos;ll use longer, more complex list items.</li>
  </ul>,
  <p key={22}>And that&apos;s the end of this section.</p>,
  <h2 key={23}>What if we stack headings?</h2>,
  <h3 key={24}>We should make sure that looks good, too.</h3>,
  <p key={25}>
    Sometimes you have headings directly underneath each other. In those cases
    you often have to undo the top margin on the second heading because it
    usually looks better for the headings to be closer together than a paragraph
    followed by a heading should be.
  </p>,
  <h3 key={26}>When a heading comes after a paragraph …</h3>,
  <p key={27}>
    When a heading comes after a paragraph, we need a bit more space, like I
    already mentioned above. Now let&apos;s see what a more complex list would
    look like.
  </p>,
  <ul key={28}>
    <li>
      <p>
        <strong>I often do this thing where list items have headings.</strong>
      </p>
      <p>
        For some reason I think this looks cool which is unfortunate because
        it&apos;s pretty annoying to get the styles right.
      </p>
      <p>
        I often have two or three paragraphs in these list items, too, so the
        hard part is getting the spacing between the paragraphs, list item
        heading, and separate list items to all make sense. Pretty tough
        honestly, you could make a strong argument that you just shouldn&apos;t
        write this way.
      </p>
    </li>
    <li>
      <p>
        <strong>Since this is a list, I need at least two items.</strong>
      </p>
      <p>
        I explained what I&apos;m doing already in the previous list item, but a
        list wouldn&apos;t be a list if it only had one item, and we really want
        this to look realistic. That&apos;s why I&apos;ve added this second list
        item so I actually have something to look at when writing the styles.
      </p>
    </li>
    <li>
      <p>
        <strong>It&apos;s not a bad idea to add a third item either.</strong>
      </p>
      <p>
        I think it probably would&apos;ve been fine to just use two items but
        three is definitely not worse, and since I seem to be having no trouble
        making up arbitrary things to type, I might as well include it.
      </p>
    </li>
  </ul>,
  <p key={29}>
    After this sort of list I usually have a closing statement or paragraph,
    because it kinda looks weird jumping right to a heading.
  </p>,
  <h2 key={30}>Code should look okay by default.</h2>,
  <p key={31}>
    I think most people are going to use{" "}
    <a href="https://highlightjs.org/" target="_blank">
      highlight.js
    </a>{" "}
    or{" "}
    <a href="https://prismjs.com/" target="_blank">
      Prism
    </a>{" "}
    or something if they want to style their code blocks but it wouldn&apos;t
    hurt to make them look <em>okay</em> out of the box, even with no syntax
    highlighting.
  </p>,
  <p key={32}>
    Here&apos;s what a default <code>tailwind.config.js</code> file looks like
    at the time of writing:
  </p>,
  <pre key={33}>
    <code>{`module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}`}</code>
  </pre>,
  <p key={34}>Hopefully that looks good enough to you.</p>,
];

export default function TypographyAnimations() {
  const options = useDynamicOptions();

  function renderContent(item: React.ReactNode, index: number) {
    return (
      <div key={index} data-aos-container className="relative">
        <AnchorPlacementMarker />
        <div
          {...toAOSProps({
            ...options,
            animation: animations[index % length],
          })}
        >
          {item}
        </div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden">
      <article className="prose dark:prose-invert mx-auto pb-24">
        {contents.map(renderContent)}
      </article>
    </section>
  );
}

const length = animations.length;
