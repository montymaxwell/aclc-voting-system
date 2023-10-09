import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type SearchProps = {
  target: 'USN' | 'id',
  staticData: Array<any>,
  data: Array<any>
  update: Dispatch<SetStateAction<Array<any>>>
}

function SimpleSearch({ target, staticData, data, update }: SearchProps) {
  console.log(data)

  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

      return () => {
        clearTimeout(timer)
      }
    }, [value, delay])

    return debouncedValue
  }

  useEffect(() => {
    if (debouncedValue !== '') {
      if (target === 'USN') {
        const filtered = data.filter((v) => v.USN.startsWith(debouncedValue));
        update(filtered);
        return;
      }
      else if (target === 'id') {
        const filtered = data.filter((v) => v.id.startsWith(debouncedValue));
        update(filtered);
        return;
      }
    }

    update(staticData)

  }, [debouncedValue])

  return (
    <div className='w-1/5'>
      <input type="text" name='searchbar' onChange={(ev => setValue(ev.target.value))} className='text-input' />
    </div>
  )
}

export default SimpleSearch