/**
 * @Author: 小贤
 * @Date: 2020-03-01 23:54:12
 * @LastEditTime: 2020-03-02 09:45:42
 * @LastEditors: 小贤
 * @Description:
 * @Email: gzyuboxian@corp.netease.com
 */
import Axios from 'axios';

export async function getGoodsDetail (id: string) {
    return await Axios.request({
        url: '/api/getCoolbuyAccount',
        method: 'GET'
    });
}
