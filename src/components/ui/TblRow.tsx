import React from 'react'

const Row = ({ caption, Content }: { caption: string; Content: any }) => (
  <tr>
    <td>
      <span className="t-s t-bold">{caption}</span>
    </td>
    <td>
      <Content />
    </td>
  </tr>
)

export { Row as TblRow }