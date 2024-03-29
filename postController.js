const Post = require('./post.js')
const axios = require('axios');
const crypto = require("crypto");
const cheerio = require('cheerio');
async function test() {
    try {
        let responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["TinkoffNew"],"countries":[],"publisherType":null,"asset":"USDT","fiat": "RUB","tradeType":"BUY"}
            )
            let binance_price = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["RosBankNew"],"countries":[],"publisherType":null,"asset":"USDT","fiat": "RUB","tradeType":"BUY"}
            )
            let binance_price_ros = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["RaiffeisenBank"],"countries":[],"publisherType":null,"asset":"USDT","fiat": "RUB","tradeType":"BUY"}
            )
            let binance_price_raiff = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["AkBarsBank"],"countries":[],"publisherType":null,"asset":"USDT","fiat": "RUB","tradeType":"BUY"}
            )
            let binance_price_akbars = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["OTPBankRussia"],"countries":[],"publisherType":null,"asset":"USDT","fiat": "RUB","tradeType":"BUY"}
            )
            let binance_price_otp = responce.data.data[0].adv.price;
            // responce = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=28&acceptOrder=0&country=&blockType=general&online=1&range=0&amount=&onlyTradable=false&isFollowed=false`,{})
            // let huobi_price = responce.data.data[1].price
            // responce = await axios.get(`https://otc.mexc.com/api/market?blockTrade=false&coinName=USDT&currency=${params.fiat}&payMethod=13&countryCode=&page=1&tradeType=${params.tradeType}&amount=`,{})
            // let mexc_price = responce.data.data[0].price
            // let bybit_price = await axios.post('https://api2.bybit.com/spot/api/otc/item/list',
            // {'userId': '','tokenId': 'USDT','currencyId': 'RUB','payment':75, 'side': 1,'size': 10,'page':1,'amount':''}
            //     )
            // console.log(bybit_price)
            return {tink: binance_price, sber:0, ros: binance_price_ros,raif: binance_price_raiff, akbars:binance_price_akbars, otp:binance_price_otp}
        } catch (e) {
            console.log(e)
            return 0
        }
}
async function getRubBybit() {
    try {
        let response = await axios.get('https://api2.bybit.com/spot/api/otc/item/list?userId=&tokenId=USDT&currencyId=RUB&payment=75&side=1&size=10&page=1&amount=',{}
             )
        let tink = response.data.result.items[0].price
        response = await axios.get('https://api2.bybit.com/spot/api/otc/item/list?userId=&tokenId=USDT&currencyId=RUB&payment=377&side=1&size=10&page=1&amount=',{}
             )
        let sber = response.data.result.items[0].price
        response = await axios.get('https://api2.bybit.com/spot/api/otc/item/list?userId=&tokenId=USDT&currencyId=RUB&payment=64&side=1&size=10&page=1&amount=',{}
             )
        let raif = response.data.result.items[0].price
        response = await axios.get('https://api2.bybit.com/spot/api/otc/item/list?userId=&tokenId=USDT&currencyId=RUB&payment=185&side=1&size=10&page=1&amount=',{}
             )
        let ros = response.data.result.items[0].price
        response = await axios.get('https://api2.bybit.com/spot/api/otc/item/list?userId=&tokenId=USDT&currencyId=RUB&payment=49&side=1&size=10&page=1&amount=',{}
             )
        let otp = response.data.result.items[0].price
        return {tink: tink, sber: sber, raif:raif, ros: ros, otp: otp, akbars: 0}
    } catch (e) {
        return 0
    }
}
async function getRubHuobi() {
    let response = null;
            try {
                let tink = 0;
                let sber = 0;
                let raif = 0;
                let ros = 0;
                let otp = 0;
                let akbars = 0;
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=SELL&currPage=1&payMethod=28&acceptOrder=0&country=&blockType=general&online=1&range=0&amount=&onlyTradable=false&isFollowed=false`,{})
                if (response.data.totalCount != 0) {
                    tink = response.data.data[0].price
                }
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=SELL&currPage=1&payMethod=29&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                if (response.data.totalCount != 0) {
                    sber = response.data.data[0].price
                }
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=SELL&currPage=1&payMethod=36&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                if (response.data.totalCount != 0) {
                    raif = response.data.data[0].price
                }
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=SELL&currPage=1&payMethod=358&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                if (response.data.totalCount != 0) {
                    ros = response.data.data[0].price
                }
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=SELL&currPage=1&payMethod=45&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                if (response.data.totalCount != 0) {
                    otp = response.data.data[0].price
                }
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=SELL&currPage=1&payMethod=176,45&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                if (response.data.totalCount != 0) {
                    akbars = response.data.data[0].price
                }
                return {tink: tink, sber: sber, raif: raif, ros: ros, otp: otp, akbars: akbars}
            } catch(ex) {
                return 0
            }
    }
class PostController {
    async buyrub(req, res) {
        try {
            const banks = ['Tinkoff','Rosbank','Райфайзен',"Sberbank","Akbars",'OTP']
            let binance = await test();
            let bybit = await getRubBybit();
            let huobi = await getRubHuobi();
            console.log(huobi)
            res.json({banks: banks, binance: binance, bybit:bybit, huobi:huobi})
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            let response = await axios.get('https://bitpapa.com/api/v1/pro/search?crypto_amount=&type=buy&page=1&sort=-price&currency_code=RUB&previous_currency_code=RUB&crypto_currency_code=USDT&with_correct_limits=false&payment_method_bank_code=B3&limit=20',{}
            )
            console.log(response.data)
            return res.json(response.data.ads[0])
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async corona(req, res) {
        try {
            let turkey = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=TUR&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=1000&receivingMethod=cash&paidNotificationEnabled=true',{})
            let azer = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=AZE&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=1000&receivingMethod=cash&paidNotificationEnabled=true',{})
            let kirg = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=KGZ&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=1000&receivingMethod=cash&paidNotificationEnabled=true',{})
            let uzb = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=UZB&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=1000&receivingMethod=cash&paidNotificationEnabled=true',{})
            let kaz = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=KAZ&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=1000&receivingMethod=cash&paidNotificationEnabled=true',{})
            let gruzia = await axios.get('https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=GEO&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=1000&receivingMethod=cash&paidNotificationEnabled=true',{})
            
            
            return res.json({
                turkey: turkey.data[0].exchangeRate,
                azer: azer.data[0].exchangeRate,
                kirg: kirg.data[0].exchangeRate,
                uzb: uzb.data[0].exchangeRate,
                kaz: kaz.data[0].exchangeRate,
                gruzia: gruzia.data[0].exchangeRate})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async pars(req, res) {
        try {
            let data = await axios.get('https://p2p.army',{})
            let $ = cheerio.load(data.data)
            $.html()
            let b
            let array = [4,8,12,16,20];
            let array1 =[]
            for (let zzz = 1; zzz< 7; zzz++) {
                for (let i = 0; i < 5 ; i++) {
                    b = $('.tRow3Cols','div',).eq(-zzz).find('div').eq(array[i]).find('div').eq(0).text()
                    array1.push(b)
                    for (let aa = 1; aa < 3; aa++ ) {
                        let s = $('.tRow3Cols','div',).eq(-zzz).find('div').eq(array[i]).find('div').eq(aa).text()
                        array1.push(s)
                    }
                }
            }
            
            return res.json({
                turkey: array1})
        } catch (e) {
            res.status(500).json(e)
        }
    }
    
}

module.exports = new PostController();