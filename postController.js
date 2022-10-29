const Post = require('./post.js')
const axios = require('axios');
const crypto = require("crypto");

class PostController {
    async create(req, res) {
        try {
            const {key, name, reward, contract, activites, rating, logo, about, start, end, links, eventLink, rewardsPool, participants, aboutDiv, img, details} = req.body
            if (key != "qwerty") {
                res.status(400).json({message: 'Invalid password'})
                return
            }
            const post = await Post.create({key,
                name,
                reward,
                contract,
                activites,
                rating,
                logo,
                about,
                start,
                end,
                links,
                eventLink,
                rewardsPool,
                participants,
                aboutDiv,
                img,
                details})
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getPriceBinance(req, res) {
        try {
            const params = req.query;
            console.log(123)
            let responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["TinkoffNew"],"countries":[],"publisherType":null,"asset":"USDT","fiat": params.fiat,"tradeType":params.tradeType}
            )
            let binance_price = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["RosBankNew"],"countries":[],"publisherType":null,"asset":"USDT","fiat": params.fiat,"tradeType":params.tradeType}
            )
            let binance_price_ros = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["RaiffeisenBank"],"countries":[],"publisherType":null,"asset":"USDT","fiat": params.fiat,"tradeType":params.tradeType}
            )
            let binance_price_raiff = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["AkBarsBank"],"countries":[],"publisherType":null,"asset":"USDT","fiat": params.fiat,"tradeType":params.tradeType}
            )
            let binance_price_akbars = responce.data.data[0].adv.price;
            responce = await axios.post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            {"proMerchantAds":false,"page":1,"rows":10,"payTypes":["OTPBankRussia"],"countries":[],"publisherType":null,"asset":"USDT","fiat": params.fiat,"tradeType":params.tradeType}
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
            return res.json(
                {binance_tink: binance_price, binance_price_ros: binance_price_ros,binance_price_raiff: binance_price_raiff, binance_price_akbars:binance_price_akbars, binance_price_otp:binance_price_otp});
        } catch (e) {
            console.log(1232)
            res.status(500).json(e)
        }
    }
    async getOne(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }
            const posts = await Post.findById(id);
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const post = req.body;
            if (!post._id) {
                res.status(400).json({message: 'Id не указан'})
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: 'Id не указан'})
            }
            const post = await Post.findByIdAndDelete(id);
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getHuobi(req, res) {
        let response = null;
            try {
                const params = req.query;
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=28&acceptOrder=0&country=&blockType=general&online=1&range=0&amount=&onlyTradable=false&isFollowed=false`,{})
                let huobi_price = response.data.data[1].price
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=29&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                let huobi_sber = response.data.data[1].price
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=36&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                let raif = response.data.data[1].price
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=358&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                let ros = response.data.data[1].price
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=45&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                console.log(response.data)
                const otp = 0
                if (response.data.totalCount != 0) {
                    otp = response.data.data[0].price
                }
                response = await axios.get(`https://otc-api.trygofast.com/v1/data/trade-market?coinId=2&currency=11&tradeType=${params.tradeType}&currPage=1&payMethod=176,45&acceptOrder=-1&country=&blockType=general&online=1&range=0&amount=&isThumbsUp=false&isMerchant=false&isTraded=false&onlyTradable=false&isFollowed=false`,{})
                let akbars = response.data.data[0].price
                return res.json({tink: huobi_price, sber: huobi_sber, raif: raif, ros: ros, otp: otp, akbars: akbars});
            } catch(ex) {
                response = null;
                // error
                return res.json(ex)
            }
    }
    async collections(req, res) {
        let response = null;
        const params = req.query;
        try {
            response = await axios.post('https://api.getgems.io/graphql',{
                "operationName":"mainPageTopCollection","variables":{"kind":params.date,"count":Number(params.num)},"query":"query mainPageTopCollection($kind: MPTopKind!, $count: Int!, $cursor: String) {\n  mainPageTopCollection(kind: $kind, first: $count, after: $cursor) {\n    cursor\n    items {\n      place\n      tonValue\n      currencyValue(currency: usd)\n      diffPercent\n      floorPrice\n      currencyFloorPrice(currency: usd)\n      collection {\n        address\n        name\n        isVerified\n        image {\n          image {\n            sized(width: 200, height: 200, format: \"collection-avatar\")\n            __typename\n          }\n          __typename\n        }\n        approximateHoldersCount\n        approximateItemsCount\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}"
            })
            console.log(params)
            return res.json(response.data)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async search(req, res) {
        let response = null;
        const params = req.query;
        try {
            response = await axios.post('https://api.getgems.io/graphql',{
                "operationName":"commonSearch","variables":{"query":`{\"$and\":[{\"search\":\"${params.name}\"},{\"isBlocked\":false}]}`,"count":30,"searchCollection":true,"searchNft":false},"query":"query commonSearch($searchNft: Boolean!, $searchCollection: Boolean!, $count: Int!, $cursor: String, $query: String, $sort: String) {\n  nfts: alphaNftItemSearch(\n    first: $count\n    after: $cursor\n    query: $query\n    sort: $sort\n  ) @include(if: $searchNft) {\n    edges {\n      node {\n        address\n        name\n        previewImage: content {\n          ... on NftContentImage {\n            image {\n              baseUrl\n              sized(width: 200, height: 200)\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        sale {\n          ... on NftSaleFixPrice {\n            fullPrice\n            __typename\n          }\n          ... on NftSaleFixPriceDisintar {\n            fullPrice\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      cursor\n      __typename\n    }\n    info {\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n  collections: alphaNftCollectionSearch(\n    first: $count\n    after: $cursor\n    query: $query\n    sort: $sort\n  ) @include(if: $searchCollection) {\n    edges {\n      node {\n        address\n        name\n        isVerified\n        previewImage: image {\n          image {\n            baseUrl\n            sized(width: 200, height: 200)\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      cursor\n      __typename\n    }\n    info {\n      hasNextPage\n      __typename\n    }\n    __typename\n  }\n}"
            })
            console.log(params)
            return res.json(response.data)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async login(req, res) {
        try {
            const { login, password } = req.body;
            if ( login != "admin" && password != "M59mh#T6H0ir") {
                res.status(400).json({message: 'Invalid password'})
                return
            }
            res.json(crypto.createHash('md5').update("M59mh#T6H0ir").digest('hex'))
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getToken(req,res) {
        try {
            const { token } = req.body
            if ( token != crypto.createHash('md5').update("M59mh#T6H0ir").digest('hex')) {
                res.status(400).json({message: 'Invalid token'})
            }
            res.json(true)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new PostController();