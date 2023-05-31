import React, { type FC, type MouseEventHandler } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import styled from 'styled-components'

interface Props {
  onClick: MouseEventHandler<HTMLButtonElement>
  open: boolean
}

const Button = styled.button<{ $open: boolean }>`
  --transition-duration: 0.1s;
  border: none;
  height: 1rem;
  width: 1rem;
  background-color: transparent;
  visibility: initial;
  opacity: 0;
  /** Notice how visibility has a delay transition so it becomes visible again only after it fades in. */
  transition: visibility 0s var(--transition-duration),
    opacity var(--transition-duration), transform var(--transition-duration),
    var(--focus-outline-transition);
  outline-color: var(--focus-outline-color);
  outline-style: solid;
  outline-width: 0;
  border-radius: 2px;

  &:focus {
    outline-width: 2px;
  }

  tr:hover &,
  &:focus ${({ $open }) => $open && `, &`} {
    transition: visibility 0s, opacity var(--transition-duration),
      transform var(--transition-duration), var(--focus-outline-transition);
    visibility: visible;
    opacity: 1;
  }

  ${({ $open }) => $open && `transform: rotate(0.25turn);`}
`

const RowToggleBtn: FC<Props> = ({ open, ...props }) => (
  <Button $open={open} {...props} type="button">
    <BsChevronRight size="1rem" />
  </Button>
)

export default RowToggleBtn
