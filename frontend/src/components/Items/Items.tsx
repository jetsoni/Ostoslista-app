import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { filterItemsByRegExp } from '../../helpers/filterItemsByRegExp';

type ItemType = {
  itemName: string;
  visible: boolean;
};

const Items: FC = () => {
  const [item, setItem] = useState<ItemType>({
    itemName: '',
    visible: true,
  });
  const [search, setSearch] = useState<string>('');
  const [items, setItems] = useState<ItemType[]>([]);

  const getItems = useCallback(async (): Promise<void> => {
    try {
      let headers = {};
      if (localStorage.getItem('userData')) {
        headers = {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization:
            'token ' +
            JSON.parse(localStorage.getItem('userData') as string).token,
        };
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/products`,
        {
          method: 'GET',
          headers,
        }
      );
      if (response.status === 200) {
        const json = await response.json();
        console.log(json);
        const arr = json.items.map((value: { name: string }) => {
          return {
            itemName: value.name,
            visible: true,
          };
        });
        setItems(arr);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    getItems().then();
  }, [getItems]);

  const addItem = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      let headers = {};
      if (localStorage.getItem('userData')) {
        headers = {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization:
            'token ' +
            JSON.parse(localStorage.getItem('userData') as string).token,
        };
      }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/v1/products/create`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            name: item.itemName,
            amount: 1,
          }),
        }
      );
      if (response.status === 201) {
        await response.json();
        setItems([...items, item]);
        setItem({
          itemName: '',
          visible: true,
        });
      }
    } catch (err) {}
  };

  const onChangeItem = (event: ChangeEvent<HTMLInputElement>) => {
    setItem((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onAddToShoppingCart = () => {};
  const onEditItem = () => {};
  const onDeleteItem = (itemName: string) => {
    const arr = items.filter((value) => {
      return value.itemName !== itemName;
    });
    setItems(arr);
  };

  const searchItems = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    // const arr = items.map((value) => {
    //   const pattern = new RegExp(event.target.value, 'g');
    //   value.itemName.match(pattern)
    //     ? (value.visible = true)
    //     : (value.visible = false);
    //   return value;
    // });
    const arr = filterItemsByRegExp(items, event.target.value);
    setItems(arr);
  };

  return (
    <div className='content'>
      <h3>Your Items</h3>
      <form onSubmit={addItem}>
        <div className='form-group' style={{ marginBottom: '25px' }}>
          <input
            type='text'
            className='form-control'
            id='itemName'
            aria-describedby='itemHelp'
            placeholder='Write the name of item'
            value={item.itemName}
            onChange={onChangeItem}
            name='itemName'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add item
        </button>
      </form>

      <form>
        <input
          style={{ marginTop: '25px', marginBottom: '25px' }}
          type='text'
          value={search}
          name='search'
          placeholder='Search item(s)'
          onChange={searchItems}
        />
      </form>

      <ul>
        {items &&
          items.map((value: ItemType) => {
            if (value.visible)
              return (
                <li>
                  {value.itemName}{' '}
                  <input
                    type='button'
                    onClick={onAddToShoppingCart}
                    value='Add to SC'
                  />
                  <input type='button' onClick={onEditItem} value='Edit' />
                  <input
                    type='button'
                    onClick={() => onDeleteItem(value.itemName)}
                    value='Delete'
                  />
                </li>
              );
          })}
      </ul>
    </div>
  );
};

export default Items;
