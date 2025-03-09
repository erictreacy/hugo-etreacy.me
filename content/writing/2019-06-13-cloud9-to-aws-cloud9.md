---
title: "Cloud9 to AWS Cloud9"
date: 2019-06-13T00:00:00-05:00
type: "post"
draft: false
---

<style>
.center {
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>


For my personal website at least. For some time I have been kinda worried about this:


<img src="/data/images/awscloud9.png" class="center" />


But not too worried. I use [GitHub](https://github.com/) â€” I keep my code in there. I just had to open a new environment in AWS Cloud9 and git-clone my site. Then,

    $ bundle install
    $ bundle update
    $ jekyll serve --host $IP --port $PORT --baseurl ''

Works.

    $ ^C

Let's just go for it.

    $ git init
    $ git add .
    $ git commit -m "Migrate from Cloud9 to AWS Cloud9"
    $ git push -f origin master


<br>

<svg class="center" width="84px" height="84px" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="black">

<path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
<path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
  <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 16 16"
      to="360 16 16"
      dur=".9s"
      repeatCount="indefinite" />
</path>

</svg>



<br>


Done!

![Netlify Status](https://api.netlify.com/api/v1/badges/e118c926-0caa-4618-a30b-899365e88718/deploy-status)

<br>

## Conclusion

Phew â€” *way* easier than I thought it would be. Only took ~7 min too.

Not much more to say about that.

-----

Note:
SVG loading icon built with love by me: Copy it. Paste it. Use it. Share it. But most importantly: have patience.

```html
<svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="black">

    <path opacity=".25" d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"/>
    <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
      <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur=".9s"
          repeatCount="indefinite" />
    </path>
</svg>
```
