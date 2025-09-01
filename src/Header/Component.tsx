import { getGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import HeaderClient from './Component.client'

export async function Header() {
  const headerData: Header = await getGlobal('header', 2)

  return <HeaderClient data={headerData} />
}
