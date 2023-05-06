import {_env } from "./index";

export const IS_DEV = _env('NODE_ENV') === 'development';

export const ERR = {
    CONTEXT: "[APP MF]: Context error!",
    BEFORE_INIT: "[MF Stores]: There was an attention of Stores usage before initiation!"
};
