export const server = {
    host: 'localhost',
    ws_port: 9090,
    web_port: 8080
};

export const endpoint = `ws://${server.host}:${server.ws_port}`;

export const is_static = true;