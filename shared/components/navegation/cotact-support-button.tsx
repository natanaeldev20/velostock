'use client'

import Link from 'next/link'
import { Button } from '@heroui/react'
import { Headphones } from '@gravity-ui/icons'
import { Icon } from '@gravity-ui/uikit'

export function ContactSupportButton() {
  return (
    <Link href="/admin/contact-support">
      <Button variant="danger" className="hidden md:flex items-center">
        <Icon data={Headphones} />
        Comunícate con soporte
      </Button>
    </Link>
  )
}
