# Steganography tool
Hiding one image inside another with a simple interface 

Key: any key to get a random encrypt (could be a domain, so the users of a site could decrypt)

Two methods:

 1. Swapping lower pixels of one image with higher pixels of another image (human undetectable, but easy to remove)
    - Using the key on every pixel to create entropy
 2. Randomly swapping rows in the encrypting image (human detectable, but uneasy to remove)

## How it works
[Steganography: Hiding an image inside another](https://towardsdatascience.com/steganography-hiding-an-image-inside-another-77ca66b2acb1) by Kelvin Salton do Prado

## How to defeat

- Human inspection
- Resolution change (cut the image to make impossible to get exact (random) pixel positions)
- Entropy measurement (if entropy of lower pixels is low then it's an image), [explained](https://incoherency.co.uk/blog/stories/image-steganography.html) by James Stanley
- Adding entropy (randomly edit lower pixels, destroying the image (using comapression))

Can beat both methods with changing resolution and compressing

## Todo

 - Bulk encryption
