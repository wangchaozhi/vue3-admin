// httpService.ts

interface HttpRequestOptions {
    method: string;
    headers?: Record<string, string>;
    body?: any;
}

const API_URL = 'http://127.0.0.1:8095/newLand';

// 从localStorage中获取令牌
function getToken(): string | null {
    return localStorage.getItem('authToken');
}

// 保存令牌到localStorage
export function saveToken(token: string): void {
    localStorage.setItem('authToken', token);
}

// 清除localStorage中的令牌
export function clearToken(): void {
    localStorage.removeItem('authToken');
}

// 执行HTTP请求的函数
export async function httpRequest(url: string, options: HttpRequestOptions): Promise<Response> {
    const { method, headers = {}, body } = options;
    const token = getToken();

    // 如果存在令牌，则在请求头中包含它
    if (token) {
        headers['token'] = `${token}`;
    }

    const response = await fetch(`${API_URL}${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
}


export async function login(userName: string, password: string): Promise<any> {
    clearToken();
    const response = await httpRequest('/user/login', {
        method: 'POST',
        body: { userName, password },
    });
    return response;
}




// 示例：使用httpRequest获取保护的资源
export async function fetchProtectedData(): Promise<any> {
    return httpRequest('/protected-data', {
        method: 'GET',
    });
}
