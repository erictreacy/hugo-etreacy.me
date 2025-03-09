---
title: Playing with Numbers (COVID-19 data)
date: 2020-04-07T00:00:00-05:00
---

<style>
table {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 85%;
    border: 1px solid #e5e5e5;
    border-collapse: collapse
}

td,th {
    padding: .25rem .5rem;
    border: 1px solid #e5e5e5
}

th {
    font-family: var(--sans);
    text-align: left;
    font-weight: normal
}

tbody tr:nth-child(odd) td,tbody tr:nth-child(odd) th {
    background-color: #f9f9f9
}
.message {
    font-size: .8rem;
  padding: 16px;
  margin-top: 32px;
    background-color: var(--etreacy-ui-colors-muted);
    border-radius: 4px;
    border-left: 8px solid var(--etreacy-ui-colors-primary);
}
</style>


<iframe title="Confirmed COVID-19 cases Upper Peninsula of Michigan" aria-label="Map" id="datawrapper-chart-Axbab" src="https://datawrapper.dwcdn.net/Axbab/36/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="480"></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(a){if(void 0!==a.data["datawrapper-height"])for(var e in a.data["datawrapper-height"]){var t=document.getElementById("datawrapper-chart-"+e)||document.querySelector("iframe[src*='"+e+"']");t&&(t.style.height=a.data["datawrapper-height"][e]+"px")}}))}();
</script>


<div class="message">This report is provisional and subject to change.  As public health investigations of individual cases continue,
there will be corrections to the status and details of referred cases that result in changes to this data.</div>


This COVID-19 pandemic is a data scientist’s dream (or an [epidemiologist’s stressor](//www.nature.com/articles/d41586-020-01003-6)). Not given the circumstances of course, but the amount of data
that people can personally relate to is like nothing we have ever seen. This is a time in which we are learning even more about ourselves: culture, science, morals, ethics, resources, etc. Data
helps us understand those things and ourselves, more — and often, at times, it confuses us. I am often reminded of a famous researcher that I had the honor of working with saying,

> *“The more we learn the more we learn what we don’t know.” — [Pippa Marrack](https://en.wikipedia.org/wiki/Philippa_Marrack)*

Since I was a middle-schooler, I have loved playing with numbers and formulations. In college
and through my whole career in biochemistry and mathematics, I have found joy in numbers and the
accompanying visualizations. The data that is currently spewing out into the public has brought the
urge to play like a grade schooler again.

Though there is a lock-down on many things in the community, one might think that there is more
time to play with these numbers but, my work is very much in demand, and the time I have to spend
on side-projects has not increased. But I push on: for this project I have decided to follow the
data of the Upper Peninsula of Michigan (mainly Marquette County) because it is a dataset that is
manageable for me — as far as size goes. I can put a little time into this dataset because, fortunately,
we don’t have many cases up here *yet*.

### Where is the data
Everywhere. That’s the great thing. For this project though I have kept it to the [C.D.C.](https://www.cdc.gov/),
[The State of Michigan](https://www.michigan.gov/) and [The New York Times](//nytimes.com) for up-to-date numbers.

### Where to map the data?
There are lots of ways to map this data on the web: [Mapbox](https://www.mapbox.com/), [Observable](//observablehq.com), [Looker](https://looker.com/), [Plotly](https://plotly.com/), [Kibana](https://www.elastic.co/kibana), etc., just to name a few. But my tool of
choice is typically [Datawrapper](https://www.datawrapper.de/). It is a solid framework that is easy and quick to use. [Gregor Aisch](https://driven-by-data.net/), a former graphics editor at
The New York Times (2014-2017), now Co-Founder/CTO at Datawrapper helped create it and now helps maintain it.
Their offices are in Berlin Germany. If you are new to data visualization and want to learn more, Datawrapper has a wonderful [learning academy](https://academy.datawrapper.de/) to get you started.

### How often do I update the data?
Data will be updated almost daily — depending on my personal responsibilities. As I said, I anticipate this project being
low demand, so I should be able to update daily, with some new graphs added as/if time deems fit.

### Why the project?
Why not? One reason though is that there isn’t an analytical team here in the UP, that I know of, that is just looking at the UP. Yes, we are
getting numbers but, having someone local (resident) that can help with the collection of data never hurts. Maybe some people will come across
it and look at it and consider the risks a little more seriously.

### But, the main reason: 
A [new study](https://cid.utexas.edu/sites/default/files/cid/files/covid-risk-maps_counties_4.3.2020.pdf?m=1585958755) by disease modelers at the University of Texas at Austin gives an answer: Even counties with just a single reported case have more
than 50 percent likelihood that a sustained, undetected outbreak — an epidemic — is already taking place.

“I worry that many local officials are waiting until there is clear evidence of local transmission before taking action,” said Lauren Ancel Meyers, a professor of biology and statistics at the university. “The message is, we should not wait.”

Overall, the study finds, 70 percent of all counties in the United States — making up 94 percent of the country's population — are likely to have epidemics. The study defines an epidemic as an outbreak that grows exponentially instead of fading out on its own, eventually infecting a large number of the population.

|Known cases in a county| Probability of community transmission (Epidemic)|
|---|---|
|0| 9%  |
|1| 51%  |
|2| 70%  |
|3| 79%  |
|4| 84%  |
|5| 85%  |
|10   | 95%  |
|20   | 99%  |
|43+   | 100%  |

### Playing the numbers 
I am both happy and disappointed with my community during this pandemic. First, I have written about the [silver-lining](/2020/03/24/COVID-19/),
which I still feel is great. Second, however, I have seen more people that aren’t part of my neighborhood wondering around
the [Marquette South Trails](https://www.mtbproject.com/directory/8011499/marquette-south-trails) and trail heads in general — people are congregating in herds there. People are moving to other
areas of the community to play — opening a higher probability of transmission. Stay home. You can even see the movement
of the people in [Marquette county according to an analysis of cellphone location data by *The New York Times*](https://www.nytimes.com/interactive/2020/04/02/us/coronavirus-social-distancing.html) — even after
the March 27th, 2020 ‘Stay-at-home' order! It finally took Marquette city to put out an order that [“All city of Marquette
parks closed effective immediately”](https://www.miningjournal.net/news/coronavirus/2020/04/all-city-of-marquette-parks-closed-effective-immediately/) to slow people down. We should know better given that it has already been presented to
us on April 2nd that we had an 85% probability of community transmission (epidemic) knocking on our doorstep. Now, April 7th, 2020,
that probability has risen to 95-99% according to disease modelers at the University of Texas at Austin saying: Even counties with
just a single reported case have more than 50 percent likelihood that a sustained, undetected outbreak — an epidemic — is already taking place.
Remember, [COVID-19 is largely spreading undetected, because of the high proportion of asymptomatic, mild infections and limited laboratory testing](https://www.medrxiv.org/content/10.1101/2020.02.14.20023127v1).

We are already in an epidemic in Marquette county. Stay home. Stay safe. Remember, that means keeping others safe, too.




> Solitude, a simple den, <br>
A piece of paper and a pen, <br>
A cup of tea, a piece of toast. <br>
A window and the holy ghost. <br>
Some calm, a table and a chair; <br>
The mind is free, the soul is bare.<br>
There's love to make and life to hold.<br>
The ancient tiny thread of gold<br>
That runs through all the joy and gloom<br>
Is found inside this tiny room.<br>
<br>
&mdash; Michael Leunig



