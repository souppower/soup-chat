import test from 'ava'
import * as sinon from 'sinon'

import once from '../src/once'

test('calls the original function', t => {
	const callback = sinon.spy()
	const proxy = once(callback)

	proxy()
	proxy()

	t.true(callback.calledOnce)
})
