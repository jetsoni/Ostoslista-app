import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

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

  const addItem = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setItems([...items, item]);
      setItem({
        itemName: '',
        visible: true,
      });
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
    const arr = items.map((value) => {
      // @ts-ignore
      const pattern = new RegExp(event.target.value, 'g');
      if (value.itemName.match(pattern)) {
        value.visible = true;
        return value;
      } else {
        value.visible = false;
        return value;
      }
    });

    setItems(arr);
  };

  // @ts-ignore
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
          type='text'
          value={search}
          name='search'
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
