import {ParsedQs} from 'qs'

export type QueryParameters = string | ParsedQs | (string | ParsedQs)[] | undefined


