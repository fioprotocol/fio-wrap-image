const { readFileSync } = require('fs')
let draw1 = '<rect id="Rectangle" fill="#083F67" opacity="0.35" x="15" y="160" width="220" height="37" rx="7"></rect><text id=".d" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="ProximaNova-Medium, Proxima Nova" font-size="15" font-weight="400" line-spacing="19" fill="#FFFFFF"><tspan x="118" y="183"></tspan></text>';
let draw2 = '<rect id="Rectangle" fill="#083F67" opacity="0.35" x="15" y="160" width="220" height="54" rx="7"></rect><text id=".domainnamedomainnam"  font-family="ProximaNova-Medium, Proxima Nova" font-size="15" font-weight="400" line-spacing="19" fill="#FFFFFF"><tspan x="31" y="182"></tspan><tspan x="31" y="201"></tspan></text>';
let draw3 = '<rect id="Rectangle" fill="#083F67" opacity="0.35" x="15" y="160" width="220" height="75" rx="7"></rect><text id=".domainnamedomainnam" font-family="ProximaNova-Medium, Proxima Nova" font-size="15" font-weight="400" line-spacing="19" fill="#FFFFFF"><tspan x="32" y="183"></tspan><tspan x="32" y="202"></tspan><tspan x="32" y="221"></tspan></text>';
class FIOCtrl {
    constructor() {}
    
    async getImageUrlWithDomain(req,res) {
      let domain = req.params.domain;
      let realdomain = domain;
      if (domain.indexOf(".svg") > 1) {
        let index = domain.indexOf(".svg");
        realdomain = domain.substring(0,  index);
      }
      try {
          let tempRes = await this.generateImage(realdomain);
          res.send(tempRes);
        } catch (error) {
          res.send({})
        }
    }
    async returnSVG() {
      const path = "fio.svg";
      const data = readFileSync(path)
      return data.toString();
    }
    async generateImage(domain) {
      let realDomain = "@"+domain
      let domainLength = realDomain.length;
      let type = 0;
      if (domainLength < 22) type = 1;
      else if(domainLength >21 && domainLength<43) type = 2;
      else if(domainLength>42&&domainLength<64) type =3;
      let drawString = await this.generateRect(type, realDomain);
      let string = await this.returnSVG();
      let output = await this.drawDomain(type, string, drawString);
      return output;
    }
    async drawDomain(type, fioString, drawString) {
      if (type == 1 || type == 3) {
        let str = '250"></polygon>';
        let index = fioString.indexOf(str)+str.length;
        var output = fioString.substring(0, index) + drawString + fioString.substring(index);
        return output;
      } else if (type == 2) {
        let str = '250"></polygon>';
        let index = fioString.indexOf(str)+str.length;
        var output = fioString.substring(0, index) + drawString + fioString.substring(index);
        return output;
      } else {
        return fioString;
      }
    }
    async generateRect(type, realDomain) {
      if (type == 1) {
        const index = draw1.search("</tspan>");
        let newDraw = draw1;
        var output = newDraw.substring(0, index) + realDomain + newDraw.substring(index);
        return output;
      } else if (type == 2) {
        let index = draw2.indexOf("</tspan>");
        let newDraw = draw2;
        var output = newDraw.substring(0, index) + realDomain.substring(0,21) + newDraw.substring(index);
        index = output.indexOf("</tspan>", index+22);
        output = output.substring(0,index)+ realDomain.substring(21) + output.substring(index);
        return output;
      } else if (type == 3) {
        let index = draw3.indexOf("</tspan>");
        let newDraw = draw3;
        var output = newDraw.substring(0, index) + realDomain.substring(0,21) + newDraw.substring(index);
        index = output.indexOf("</tspan>", index+22);
        output = output.substring(0,index)+ realDomain.substring(21,42) + output.substring(index);
        index = output.indexOf("</tspan>", index+22);
        output = output.substring(0,index)+ realDomain.substring(42) + output.substring(index);
        return output;
      } else {
        return "";
      }
    }
}

export default new FIOCtrl();