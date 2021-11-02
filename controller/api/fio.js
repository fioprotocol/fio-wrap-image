const { readFileSync } = require('fs')
class FIOCtrl {
    constructor() {}
    
    async getImageUrlWithDomain(req,res) {
        let domain = req.query.domain;
        try {
            let tempRes = {
            }
            this.generateImage(domain)
            res.send(tempRes);
          } catch (error) {
            console.log(error);
            res.send({})
          }
    }
    async returnSVG() {
      const path = "fio.svg";
      const data = readFileSync(path)
      // // since fs.readFile returns a buffer, we should probably convert it to a string.
      // return data.toString()
      return data.toString();
    }
    async generateImage(domain) {
      let realDoamin = "."+domain
      let domainLength = realDoamin.length;
      let string = await this.returnSVG();
      
    }
}

export default new FIOCtrl();