import { SessionStrategy } from '@keystone-6/core/types';
import { generators, custom } from 'openid-client';
import { Session } from '.';

// class CustomStateStore implements StateStore{
//   sessionStrategy;
//   constructor(sessionStrategy: SessionStrategy<Session>) {
//     this.sessionStrategy = sessionStrategy;
//   }

//   async store(req: Express.Request, state: String, meta) {}
// }
