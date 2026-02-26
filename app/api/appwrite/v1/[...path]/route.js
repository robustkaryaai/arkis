'use server';

const UPSTREAM = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';

async function proxy(request) {
    const url = new URL(request.url);
    const prefix = '/api/appwrite/v1/';
    const relativePath = url.pathname.startsWith(prefix) ? url.pathname.slice(prefix.length) : '';
    const upstreamUrl = new URL(`${UPSTREAM}/${relativePath}`);
    upstreamUrl.search = url.search;

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('connection');
    headers.delete('forwarded');
    headers.delete('x-forwarded-for');
    headers.delete('x-forwarded-host');
    headers.delete('x-forwarded-port');
    headers.delete('x-forwarded-proto');
    headers.delete('x-real-ip');
    headers.delete('origin');
    headers.delete('referer');

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
    return proxy(request);
}

export async function POST(request, { params }) {
    return proxy(request);
}

export async function PUT(request, { params }) {
    return proxy(request);
}

export async function PATCH(request, { params }) {
    return proxy(request);
}

export async function DELETE(request, { params }) {
    return proxy(request);
}

export async function OPTIONS(request, { params }) {
    return proxy(request);
}
