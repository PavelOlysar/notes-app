'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SignOutBtn } from '../SignOut'
import { DeleteProfile } from '../DeleteProfile'
import { Separator } from '@/components/ui/separator'

interface AccountSettingsProps {
  username: string
}

export function AccountSettings({ username }: AccountSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Sign Out</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Sign out of your account on this device.
              </p>
              <SignOutBtn />
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium mb-2 text-destructive">
                Danger Zone
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                Once you delete your account, there is no going back.
              </p>
              <DeleteProfile username={username} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
