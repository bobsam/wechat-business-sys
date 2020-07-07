/**
 * @Author: 小贤
 * @Date: 2020-03-01 23:54:12
 * @LastEditTime: 2020-07-07 23:32:10
 * @LastEditors: 小贤
 * @Description:
 * @Email: gzyuboxian@corp.netease.com
 */
import Axios from 'axios';

interface IResponse {
    code: number;
    result?: any;
}

/**
 * 获取详情页信息
 *
 * @export
 * @param {string} id
 * @returns
 */
export async function getGoodsDetail (id: string): Promise<IResponse> {
    const response = await Axios.request({
        url: '/api/detail',
        method: 'GET',
        withCredentials: true,
        params: {
            id
        }
    });

    if (response.status === 200) {
        return response.data;
    } else {
        return {
            code: -999
        };
    }
}

/**
 * 获取帐号信息
 *
 * @export
 * @returns
 */
export async function getAccountMsg (): Promise<IResponse> {
    const response = await Axios.request({
        url: '/api/getCoolbuyAccount',
        method: 'GET',
        withCredentials: true
    });

    if (response.status === 200) {
        return response.data;
    } else {
        return {
            code: -999
        };
    }
}

/**
 * 获取商品购买链接
 *
 * @export
 * @param {string} type
 * @param {string} user
 * @param {string} id
 * @returns
 */
export async function getCoolbuyWebUrl (type: string, user: string, id: string): Promise<IResponse> {
    const response = await Axios.request({
        url: '/api/getCoolbuyWebUrl',
        method: 'GET',
        withCredentials: true,
        params: {
            type,
            user,
            id
        }
    });

    if (response.status === 200) {
        return response.data;
    } else {
        return {
            code: -999
        };
    }
}

/**
 * 生成短链接
 *
 * @export
 * @param {string} url
 * @returns
 */
export async function generateShortenUrl (url: string, type?: string): Promise<IResponse> {
    const response = await Axios.request({
        url: '/api/genUrlBySojson',
        method: 'GET',
        withCredentials: true,
        params: {
            url: encodeURIComponent(url || ''),
            type
        }
    });

    if (response.status === 200) {
        return response.data;
    } else {
        return {
            code: -999
        };
    }
}


/**
 * 生成短链接
 *
 * @export
 * @param {string} url
 * @returns
 */
export async function generateShortenUrlV2 (url: string, type?: string): Promise<IResponse> {
    const response = await Axios.request({
        url: '/api/genUrlByAlapi',
        method: 'GET',
        withCredentials: true,
        params: {
            url: encodeURIComponent(url || ''),
            type
        }
    });

    if (response.status === 200) {
        return {
            ...response.data,
            result: {
                ...response.data.result,
                ...(response.data.result.data || {})
            }
        };
    } else {
        return {
            code: -999
        };
    }
}


/**
 * 生成短链接
 *
 * @export
 * @param {string} url
 * @returns
 */
export async function generateShortenUrlV3 (url: string): Promise<IResponse> {
    const response = await Axios.request({
        url: '/api/genUrlByDute',
        method: 'GET',
        withCredentials: true,
        params: {
            url: encodeURIComponent(url || '')
        }
    });

    if (response.status === 200) {
        return {
            ...response.data,
            result: {
                ...response.data.result,
                ...(response.data.result.data || {}),
                longurl: url,
                shorturl: response.data.result.data.url
            }
        };
    } else {
        return {
            code: -999
        };
    }
}
