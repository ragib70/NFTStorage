import logo from './logo.svg';
import './App.css';
import React from 'react';
import { NFTStorage } from "nft.storage";

const API_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJiNTg5NUJiMmJiY2Y2OTA3MzlDMUJDQjQ1NzQ1M2IxQmY0Q0MyMzciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0ODk5NTA4MjgwOSwibmFtZSI6Ik5GVF9TVE9SQUdFX0FQSV9LRVkifQ.Da3Zh8nxAlH3OqmF5BZPOisjVA3ff081APc0Avg5BUg";

export default class App extends React.Component{

  // For example's sake, we'll fetch an image from an HTTP URL.
  // In most cases, you'll want to use files provided by a user instead.
  async getExampleImage() {
    const imageOriginUrl =
      //"https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg";
      "https://i.stack.imgur.com/Y7bVp.png";
    const r = await fetch(imageOriginUrl, {mode : "no-cors", method : "GET"});
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
    }
    return r.blob();
  }

  async storeExampleNFT() {
    //const image = await this.getExampleImage();
    const image = new Blob();
    const nft = {
      image, // use image Blob as `image` field
      name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
      description: "The metaverse is here. Where is it all being stored?",
      properties: {
        type: "blog-post",
        origins: {
          http: "https://nft.storage/blog/post/2021-11-30-hello-world-nft-storage/",
          ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/",
        },
        authors: [{ name: "David Choi" }],
        content: {
          "text/markdown":
            "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>",
        },
      },
    };

    const client = new NFTStorage({ token: API_KEY });
    const metadata = await client.store(nft);

    console.log("NFT data stored!");
    console.log("Metadata URI: ", metadata.url);
  }

  // storeExampleNFT();

  // document.getElementById("btn-ready").onclick = storeExampleNFT;

  render(){
    return <div>
      <button id="btn-ready" onClick={() => {this.storeExampleNFT()}}>Ready</button>
      </div>
  }
}
