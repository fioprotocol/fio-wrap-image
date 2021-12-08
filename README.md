# fio-wrap-image

The FIO Wrapping image service is used to standardize the image returned for FIO Domains that have been wrapped as NFTs on another protocol such as Ethereum or Polygon. 
The URL for the image is auto-generated using the [FIO Wrapping URI service](https://github.com/fioprotocol/fio-wrap-uri) which returns JSON associated with a Wrapped FIO Domain.

This service takes as an input a URL with a domain name passed as a parameter. In this example "sampledomain" is being passed in.

```
https://metadata.fioprotocol.io/nftimage/sampledomain.svg
```

It returns a dynamically generated .svg image with the FIO logo and the name of the wrapped FIO Domain.
