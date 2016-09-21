
// Sample test suite utilizing Bluecat

var expect = require('chai').expect;
var test = require('../../test/test.js');
var Config = require('config');

describe('Sample test suite', function() {
  before(function() {
    service = test.bleacher;
  });

  it('Checkout flow [C001]', function(done) {
    service.run(function() {
      var r = service.rawRequest({
        uri: 'http://www.bleachercreatures.com',
        method: 'GET',
        jar: true,
        proxy: Config.proxy
      });
      var formKey = r.data.headers['set-cookie'][0].split(';')[0].split('=')[1];
      console.log(formKey);
      expect(r.data.statusCode).to.equal(200);

      // add to cart
      r = service.rawRequest({
        uri: 'http://www.bleachercreatures.com/checkout/cart/add/uenc/aHR0cDovL3d3dy5ibGVhY2hlcmNyZWF0dXJlcy5jb20v/product/1834/form_key/'+formKey+'/',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        jar: true,
        body: 'product=1834&qty=1&easy_ajax=1&action_content[0]=topCart',
        followAllRedirects: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);

      // click on checkout
      r = service.rawRequest({
        uri: 'http://www.bleachercreatures.com/checkout/cart/',
        method: 'GET',
        jar: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);

      // click on checkout now
      r = service.rawRequest({
        uri: 'https://www.bleachercreatures.com/checkout/onepage/',
        method: 'GET',
        jar: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);

      // click on go to payment (save shipping info)
      r = service.rawRequest({
        uri: 'https://www.bleachercreatures.com/checkout/onepage/saveShipping/',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        jar: true,
        body: 'login%5Busername%5D=fan%40email.com&login%5Bpassword%5D=&shipping%5Baddress_id%5D=64576&shipping%5Bfullname%5D=first+second&shipping%5Bcompany%5D=company&shipping%5Bstreet%5D%5B%5D=123+acme+ave&shipping%5Bstreet%5D%5B%5D=&shipping%5Bpostcode%5D=94561&shipping%5Bcity%5D=Oakley&shipping%5Bregion_id%5D=12&shipping%5Bregion%5D=&shipping%5Bcountry_id%5D=US&shipping%5Btelephone%5D=(610)+982-2212&shipping%5Bsave_in_address_book%5D=1',
        followAllRedirects: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);
      //expect(r.data.body.goto_section).to.eql('shipping_method');

      // click on go to payment (save shipping method info)
      r = service.rawRequest({
        uri: 'https://www.bleachercreatures.com/checkout/onepage/saveShippingMethod/',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        jar: true,
        body: 'shipping_method=tablerate_bestway&login%5Busername%5D=fan%40email.com&login%5Bpassword%5D=&shipping%5Baddress_id%5D=64576&shipping%5Bfullname%5D=first+second&shipping%5Bcompany%5D=company&shipping%5Bstreet%5D%5B%5D=123+acme+ave&shipping%5Bstreet%5D%5B%5D=&shipping%5Bpostcode%5D=94561&shipping%5Bcity%5D=Oakley&shipping%5Bregion_id%5D=12&shipping%5Bregion%5D=&shipping%5Bcountry_id%5D=US&shipping%5Btelephone%5D=(610)+982-2212&shipping%5Bsave_in_address_book%5D=1',
        followAllRedirects: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);
      //expect(r.data.body.goto_section).to.eql('payment');

      // click on review purchase (save payment info)
      r = service.rawRequest({
        uri: 'https://www.bleachercreatures.com/checkout/onepage/savePayment/',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        jar: true,
        body: 'payment%5Bmethod%5D=authnetcim&payment%5Bcc_type%5D=VI&payment%5Bcc_number%5D=4111111111111111&payment%5Bcc_exp_month%5D=4&payment%5Bcc_exp_year%5D=2021&payment%5Bcc_cid%5D=123&billing%5Bsame_as_shipping%5D=1&billing%5Baddress_id%5D=64575&billing%5Bfullname%5D=first+second&billing%5Bcompany%5D=company&billing%5Bstreet%5D%5B%5D=123+acme+ave&billing%5Bstreet%5D%5B%5D=&billing%5Bpostcode%5D=94561&billing%5Bcity%5D=Oakley&billing%5Bregion_id%5D=12&billing%5Bregion%5D=&billing%5Bcountry_id%5D=US&billing%5Btelephone%5D=(610)+982-2212&password=',
        followAllRedirects: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);
      //expect(r.data.body.goto_section).to.eql('review');

      // click on complete your order
      r = service.rawRequest({
        uri: 'https://www.bleachercreatures.com/checkout/onepage/saveOrder/',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        jar: true,
        body: 'payment%5Bmethod%5D=authnetcim&payment%5Bcc_type%5D=VI&payment%5Bcc_number%5D=4111111111111111&payment%5Bcc_exp_month%5D=4&payment%5Bcc_exp_year%5D=2021&payment%5Bcc_cid%5D=123&billing%5Bsame_as_shipping%5D=1&billing%5Baddress_id%5D=64575&billing%5Bfullname%5D=first+second&billing%5Bcompany%5D=company&billing%5Bstreet%5D%5B%5D=123+acme+ave&billing%5Bstreet%5D%5B%5D=&billing%5Bpostcode%5D=94561&billing%5Bcity%5D=Oakley&billing%5Bregion_id%5D=12&billing%5Bregion%5D=&billing%5Bcountry_id%5D=US&billing%5Btelephone%5D=(610)+982-2212&&&newsletter_subscribe=1',
        followAllRedirects: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);

      // get cart
      r = service.rawRequest({
        uri: 'http://www.bleachercreatures.com/checkout/cart/',
        method: 'GET',
        jar: true,
        proxy: Config.proxy
      });
      expect(r.data.statusCode).to.equal(200);

      done();
    });
  });

});
