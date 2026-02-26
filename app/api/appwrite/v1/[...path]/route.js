'use server';

const UPSTREAM = 'https://cloud.appwrite.io/v1';

async function proxy(request, params) {
    const url = new URL(request.url);
    const upstreamUrl = new URL(`${UPSTREAM}/${(params?.path || []).join('/')}`);
    upstreamUrl.search = url.search;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('connection');

    const init = {
        method: request.method,
        headers,
        redirect: 'manual',
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        init.body = await request.arrayBuffer();
    }

    const upstreamRes = await fetch(upstreamUrl, init);

    const resHeaders = new Headers(upstreamRes.headers);
    resHeaders.delete('content-encoding');
    resHeaders.delete('content-length');

    return new Response(upstreamRes.body, {
        status: upstreamRes.status,
        statusText: upstreamRes.statusText,
        headers: resHeaders,
    });
}

export async function GET(request, { params }) {
    return proxy(request, params);
}

export async function POST(request, { params }) {
    return proxy(request, params);
}

export async function PUT(request, { params }) {
    return proxy(request, params);
}

export async function PATCH(request, { params }) {
    return proxy(request, params);
}

export async function DELETE(request, { params }) {
    return proxy(request, params);
}

export async function OPTIONS(request, { params }) {
    return proxy(request, params);
}
