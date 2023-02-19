import { Tag, Select, Space } from 'antd'
import React from 'react'
import { MdFilterList } from 'react-icons/md'
import {
  BsArrowsMove,
  BsArrowUp,
  BsBell,
  BsBellSlash,
  BsEyeSlash,
  BsPlus,
  BsThreeDots,
} from 'react-icons/bs'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import alertCreated from '../../../assets/widget-icons/greenGraph.svg'
import alertResolved from '../../../assets/widget-icons/yellowGraph.svg'
import classes from './ActiveAlert.module.scss'

const ActiveAlert = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <AdminPageLayout>
      <section className={classes.ActiveAlert}>
        <section>
          <PageBreadcrumb title={'Active Alert'} />
        </section>

        <section className={classes.ActiveAlert__WidgetSection}>
          <div className={classes.ActiveAlert__WidgetLeftContent}>
            <div className={classes.ActiveAlert__WidgetIcon}>
              <BsBell color={'#497A38'} size={15} />
            </div>
            <div className={classes.ActiveAlert__WidgetText}>
              <p>Active alerts created</p>
              <h1 className={classes.ActiveAlert__WidgetValue}>5</h1>
            </div>
            <div className={classes.ActiveAlert__WidgetGraphOne}>
              <img src={alertCreated} alt="" srcSet="" />
            </div>
          </div>
          <div className={classes.ActiveAlert__WidgetRightContent}>
            <div className={classes.ActiveAlert__WidgetCenter}>
              <div className={classes.ActiveAlert__WidgetIcon}>
                <BsArrowsMove color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlert__WidgetText}>
                <p>Device location alert</p>
                <h1 className={classes.ActiveAlert__WidgetValue}>18</h1>
              </div>
              <div className={classes.ActiveAlert__WidgetExtra}>
                <div>
                  <BsEyeSlash color={'#292D32'} size={15} />
                </div>
                <div>
                  <Tag
                    key={'1'}
                    style={{
                      borderRadius: '16px',
                      color: '#039855',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      background: ' #ECFDF3',
                    }}
                  >
                    <BsArrowUp color={'#039855'} size={15} /> 19%
                  </Tag>
                </div>
              </div>
            </div>
            <div className={classes.ActiveAlert__WidgetRight}>
              <div className={classes.ActiveAlert__WidgetIcon}>
                <BsBellSlash color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlert__WidgetText}>
                <p>Total number of resolved alert</p>
                <div className={classes.ActiveAlert__WidgetVal}>
                  <h1 className={classes.ActiveAlert__WidgetValue}>198</h1>
                  <div className={classes.ActiveAlert__WidgetGraphTwo}>
                    <img src={alertResolved} alt="" srcSet="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.ActiveAlert__DataSection}>
          <div className={classes.ActiveAlert__DataNotification}>
            <div className={classes.ActiveAlert__DataNotificationHeader}>
              <div>
                <h1>Active Alerts</h1>
              </div>
              <div>
                <button>
                  {' '}
                  <BsPlus />
                  Add Alert
                </button>
              </div>
            </div>
            <div className={classes.ActiveAlert__DataNotificationList}>
              <div>
                <span>
                  <BsThreeDots />
                </span>
                <p>Abnormal load</p>
                <p>Reduce load on SHS </p>
              </div>
              <div>
                <span>
                  <BsThreeDots />
                </span>
                <p>Low panel voltage</p>
                <p>
                  Disconnect your solar panel from your PV system and Make sure
                  your solar panel is getting sufficient light.{' '}
                </p>
              </div>
              <div>
                <span>
                  <BsThreeDots />
                </span>
                <p>Low Battery voltage</p>
                <p>
                  Check for corroded/loose connections, if none found contact
                  support.{' '}
                </p>
              </div>
            </div>
            <div className={classes.ActiveAlert__DataNotificationViewBtn}>
              <button>View Created Alert</button>
            </div>
          </div>
          <div className={classes.ActiveAlert__DataStats}>
            <div className={classes.ActiveAlert__DataNotificationHeader}>
              <div>
                <h1>Active Alert Statistic</h1>
                <p>Updated 1min ago</p>
              </div>
              <div>
                <Space>
                  <MdFilterList />
                  <Select
                    defaultValue="lucy"
                    prefixIcon={'hello'}
                    style={{
                      width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: 'jack',
                        label: 'Jack',
                      },
                      {
                        value: 'lucy',
                        label: 'Lucy',
                      },
                      {
                        value: 'Yiminghe',
                        label: 'yiminghe',
                      },
                      {
                        value: 'disabled',
                        label: 'Disabled',
                        disabled: true,
                      },
                    ]}
                  />
                </Space>
              </div>
            </div>
          </div>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default ActiveAlert
