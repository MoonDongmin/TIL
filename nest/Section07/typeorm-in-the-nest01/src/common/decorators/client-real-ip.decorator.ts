import * as requestIp from 'request-ip'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

// 현재 사용자의 ip를 추출해줌: 조회수, 방문객 나타낼 때 사용한다고 보면됨.
export const ClientIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest()

    if (request.headers['cf-connecting-ip'])
      //* cloudflare origin ip */
      return request.headers['cf-connecting-ip']
    else return requestIp.getClientIp(request)
  },
)
