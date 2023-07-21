# Steganography encoder
Hiding one image inside another with a simple interface 

Two types:

 1. Human detectable (but impossible to remove or auto detect)
 2. Human undetectable (but easy to remove)

## How it works
[Steganography: Hiding an image inside another](https://towardsdatascience.com/steganography-hiding-an-image-inside-another-77ca66b2acb1) by Kelvin Salton do Prado

## How to defeat

- Human inspection
- Resolution change (cut the image to make impossible to get random pixels position)
- Entropy measurement (if entropy of lower pixels is low then it's an image)
- Adding entropy (randomly edit lower pixels, destroying the image)
