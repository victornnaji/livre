import {act, renderHook} from '@testing-library/react-hooks';
import { useAsync } from 'hooks/use-async';

function deferred(){
    let resolve, reject
    const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
    })

    return {promise, resolve, reject}
}

test('calling run with a promise that resolves', async () => {
    const {result} = renderHook(() => useAsync());

    const {resolve, promise} = deferred();

    expect(result.current).toEqual({
        isIdle: true,
        isLoading: false,
        isError: false,
        isSuccess: false,

        error: null,
        status: 'idle',
        data: null,

        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
    })

    let p;
    act(() => {
        p = result.current.run(promise)
    })

    expect(result.current).toEqual({
        isIdle: false,
        isLoading: true,
        isError: false,
        isSuccess: false,
        
        error: null,
        status: 'pending',
        data: null,

        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
    })

    const resolvedData = Symbol('some data')

    await act(async () => {
        resolve(resolvedData);
        await p;
    })

    expect(result.current).toEqual({
        isIdle: false,
        isLoading: false,
        isError: false,
        isSuccess: true,
        
        error: null,
        status: 'resolved',
        data: resolvedData,

        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
    })
})

test('Call run with a promise that rejects', async () => {
    const {promise, reject} = deferred();

    const {result} = renderHook(() => useAsync());

    let p;
    act(() => {
        p = result.current.run(promise);
    })

    const rejectedvalue = Symbol('REJECTED');
    await act(async () => {
        reject(rejectedvalue);
        await p.catch(() => {
            //ignore error
        })
    })

    expect(result.current).toEqual({
        isIdle: false,
        isLoading: false,
        isError: true,
        isSuccess: false,
        
        error: rejectedvalue,
        status: 'rejected',
        data: null,

        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
    })
})

test('can specify an initial state', async () => {
    const mockData = Symbol('resolved valued');
    const InitialData = {status: 'resolved', data: mockData};

    const {result } = renderHook(() => useAsync(InitialData));

    expect(result.current).toEqual({
        isIdle: false,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
        data: mockData,
        status: 'resolved',
        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
      })
})

test('can use the setData function', async () => {
    const mockData = Symbol('resolved value');
    const {result } = renderHook(() => useAsync());

    act(() => {
        result.current.setData(mockData);
    })

    expect(result.current).toEqual({
        isIdle: false,
        isLoading: false,
        isError: false,
        isSuccess: true,
        error: null,
        data: mockData,
        status: 'resolved',
        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
      })
})
test('can use the setError function', async () => {
    const mockData = Symbol('error value');
    const {result } = renderHook(() => useAsync());

    act(() => {
        result.current.setError(mockData);
    })

    expect(result.current).toEqual({
        isIdle: false,
        isLoading: false,
        isError: true,
        isSuccess: false,
        error: mockData,
        data: null,
        status: 'rejected',
        setData: expect.any(Function),
        setError: expect.any(Function),
        run: expect.any(Function),
        reset: expect.any(Function)
      })
})