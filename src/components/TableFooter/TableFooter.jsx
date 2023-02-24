import { Button } from 'antd'
import React from 'react'
import classes from './TableFooter.module.scss'

const TableFooter = ({ handleClick, pageNo, hasNext, hasPrev }) => {
  return (
    <section className={classes.TableFooter__Footer}>
      <div className={classes.TableFooter__NavBtn}>
        <Button disabled={!!hasNext} onClick={(e) => handleClick(pageNo - 1)}>
          Previous
        </Button>
        <Button disabled={!!hasPrev} onClick={(e) => handleClick(pageNo + 1)}>
          Next
        </Button>
      </div>
      <div className={classes.TableFooter__Pagination}>Page {pageNo} of 10</div>
    </section>
  )
}

export default TableFooter
