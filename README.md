# PricePerfect

PricePerfect is an app that uses statistics & AI to appraise resale value

https://devpost.com/software/no-name-w08btv

## Inspiration
One of the hardest parts of selling your stuff online – be it Kijiji, eBay, Facebook Marketplace, or otherwise – is figuring out what a reasonable price is. Too high and nobody's interested, too low and... well, nobody likes losing money! But what if we could solve this problem?

## What it does
Our tool aggregates hundreds of eBay listings for any given query and gives you an estimate of what you should list your item for, based either on the title of your listing or an image of the object!

## How we built it
For the image recognition component, we used Google's excellent Vision AI API, which classifies what is in the image you enter into the app. To get our statistics from eBay, we currently scrape eBay a Python script, extracting the titles and prices for submitted search terms – we would have liked to use eBay's API, but access to it is delayed by one business day which we obviously did not have!

## Challenges we ran into
At first, we wanted to use a fine-tuned BERT (Bidirectional Encoder Representations from Transformers) model trained for regression. We saw some excellent research doing this for very similar use cases, and figured it would be a good path to take. Quickly downloading a (dataset of about 20k eBay listings)[https://data.world/promptcloud/ebay-product-dataset] and their prices, we set up a Google Colab to train the model and see what we could do. Problems quickly arose, not only from a lack of familiarity with transformers but also due to the tight time constraints of Hack the North. It became clear that to do a proper round of training and get the model where we wanted would take days, so we set about coming up with a different approach. Like mentioned before, it turned out that the eBay API was a non-starter, but BeautifulSoup came to the rescue and enabled us to scrape eBay's search results – we figured that, for a small hackathon project, this would be okay.

## Accomplishments that we're proud of
Picking up React Native in such a short amount of time and making something actually functional – and really rather good-looking – was awesome! This is the first time either of us had built a mobile app, and having that achievement under our belts feels great. Tackling the variety of roadblocks and problems we encountered along the way was as challenging as it was rewarding, and we're proud to have gotten our project to the point where it stands now.

## What we learned
We learned so much over the course of just a few days. We only had passing knowledge of how to use transformer models, and didn't even know it was possible to use BERT for regression; figuring out how to get that working, despite it proving nonviable, was incredibly valuable as a learning experience. Learning how to build a React Native mobile app from scratch was also entirely novel, and gave us exposure to one of the world's most popular web development frameworks. Crawling around Google Cloud Platform and seeing what we could use to make our project as awesome as it could be, taught us about all the nuances of setting up OAuth2, using Google Cloud Functions, and building an entire project using a platform neither of us had really looked at in-depth before.

Overall, we did a ton of learning in just a few days, and it was all a blast!

## What's next for
We'd like to circle back to using BERT for appraisals when there is more time for training, fiddling, and testing – it seemed like a promising path, and would also help us make the project more self-reliant, reducing the need for external APIs. It would also be great to publish the app on the Apple App Store or Google Play Store sometime soon, though a lot more polish will be needed before it's ready for the prime-time.
