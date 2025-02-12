import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getProfileByUsername } from '@/actions/profile.action'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
// import { DeleteProfile } from '@/components/DeleteProfile'

async function ProfilePage({ params }: { params: { username: string } }) {
  const user = await currentUser()

  if (!user) redirect('/')

  const result = await getProfileByUsername(params.username)

  if (!result.success) {
    redirect('/404')
  }

  return (
    <div className="space-y-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-20">
              <AvatarImage
                src={result.user.image || ''}
                alt={result.user.username}
              />
              <AvatarFallback>
                {result.user.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{result.user.username}</h2>
              <p className="text-muted-foreground">{result.user.email}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">Notes</p>
              <p className="text-2xl font-bold">{result.user._count.notes}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Joined</p>
              <p className="text-2xl font-bold">
                {formatDate(result.user.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <DeleteProfile username={result.user.username} /> */}
    </div>
  )
}

export default ProfilePage
