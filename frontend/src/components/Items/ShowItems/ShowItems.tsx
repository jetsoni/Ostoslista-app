import React, { ChangeEvent, FC, FormEvent } from 'react';

type ItemType = {
  itemName: string;
  visible: boolean;
};

interface AddItemProps {
  items: ItemType[];
  onAddToShoppingCart(): void;
  onEditItem(): void;
  onDeleteItem(itemName: string): void;
}

const ShowItems: FC<AddItemProps> = ({
  items,
  onAddToShoppingCart,
  onEditItem,
  onDeleteItem,
}) => {
  return (
    <>
      <h3>List of your Item</h3>
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
    </>
  );
};

export default ShowItems;
