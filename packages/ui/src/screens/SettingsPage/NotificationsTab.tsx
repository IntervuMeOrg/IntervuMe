import { Card, CardContent } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { TabsContent } from '../../components/ui/tabs';

type NotificationTabProps = {
    emailNotifications: boolean;
    setEmailNotifications: (value: boolean) => void;
    pushNotifications: boolean;
    setPushNotifications: (value: boolean) => void;
    marketingEmails: boolean;
    setMarketingEmails: (value: boolean) => void;
};

export const NotificationTab = ({
	emailNotifications,
	setEmailNotifications,
	pushNotifications,
	setPushNotifications,
	marketingEmails,
	setMarketingEmails,
}: NotificationTabProps) => {
	return (
		<TabsContent value="notifications">
			<Card className="bg-[#E8EEF2] shadow-lg border-0 overflow-hidden">
				<CardContent className="p-6">
					<h2 className="font-['Nunito',Helvetica] font-bold text-[1.5rem] mb-6 text-[#1d1d20]">
						Notification Preferences
					</h2>

					<div className="space-y-6">
						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<Label
									htmlFor="email-notifications"
									className="text-[1rem] font-semibold"
								>
									Email Notifications
								</Label>
								<p className="text-sm text-gray-500">
									Receive email notifications about your interviews and feedback
								</p>
							</div>
							<Switch
								id="email-notifications"
								checked={emailNotifications}
								onCheckedChange={setEmailNotifications}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<Label
									htmlFor="push-notifications"
									className="text-[1rem] font-semibold"
								>
									Push Notifications
								</Label>
								<p className="text-sm text-gray-500">
									Receive push notifications for interview reminders and updates
								</p>
							</div>
							<Switch
								id="push-notifications"
								checked={pushNotifications}
								onCheckedChange={setPushNotifications}
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-1">
								<Label
									htmlFor="marketing-emails"
									className="text-[1rem] font-semibold"
								>
									Marketing Emails
								</Label>
								<p className="text-sm text-gray-500">
									Receive emails about new features, tips, and promotions
								</p>
							</div>
							<Switch
								id="marketing-emails"
								checked={marketingEmails}
								onCheckedChange={setMarketingEmails}
							/>
						</div>
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};