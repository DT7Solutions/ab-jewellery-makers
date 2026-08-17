from django.core.management.base import BaseCommand
from store.gold_service import sync_daily_gold_rate

class Command(BaseCommand):
    help = "Daily update of live 22K/24K Original Gold Rate in Tenali, AP"

    def handle(self, *args, **options):
        rate = sync_daily_gold_rate()
        self.stdout.write(
            self.style.SUCCESS(
                f"Successfully synced daily Gold Rate: 22K=Rs.{rate.gold_22k_per_gram}/g, 24K=Rs.{rate.gold_24k_per_gram}/g ({rate.location})"
            )
        )
