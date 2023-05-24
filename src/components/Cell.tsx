import styled from 'styled-components'

export default styled.td`
  box-sizing: border-box;
  display: flex;
  padding: 0.5rem;
  flex-direction: row;
  align-items: center;
  justify-items: stretch;
  background: var(--cell-background);
  white-space: nowrap;
  border: var(--table-border);
  border-style: none none solid solid;
  height: var(--row-height);
  overflow-y: visible;

  &:last-child {
    border-right: var(--table-border);
  }
`
