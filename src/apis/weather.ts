// import req from '@/utils/axios'

// // 获取坐标的城市信息
// // location: 需要查询地区的名称，支持文字、以英文逗号分隔的经度,纬度坐标（十进制，最多支持小数点后两位）
// // LocationID或Adcode（仅限中国城市）。例如 location=北京 或 location=116.41,39.92

// // lang 多语言设置，默认中文
// export function getLocation(location: string, lang = 'zh') {
//     return req
//         .get('/v2/city/lookup', {
//             params: {
//                 location,
//                 lang
//             }
//         })
//         .then((res: any) => {
//             return res
//         })
// }
