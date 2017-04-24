<template>
    <div>
        <form id="form_id"  method="post" >
            <input class="alipay_pay_none" name="WIDout_trade_no" id="WIDout_trade_no"/>
            <input class="alipay_pay_none" name="WIDsubject" id="WIDsubject"/>
            <input class="alipay_pay_none" name="WIDtotal_fee" id="WIDtotal_fee"/>
            <input class="alipay_pay_none" name="WIDshow_url" id="WIDshow_url"/>
            <input class="alipay_pay_none" name="WIDbody"  id="WIDbody"/>
        </form>
    </div>
</template>
<style>
    .alipay_pay_none{
        display: none;
    }
</style>
<script>
    /*
    input url params:
    F_TRADE_NO string
    F_SUBJECT string
    F_TOTAL_FEE string
    F_ACTION_URL string

     */


    function mounted() {
        document.getElementById('WIDout_trade_no').value='10';
        document.getElementById('WIDsubject').value='10';
        document.getElementById('WIDtotal_fee').value='10';


        var form=document.getElementById("form_id");
        form.action="http://192.168.40.41:89/apisvc/jsp/alipayapi.jsp";

        form.submit();
    }

    export default{
        data(){
            return{

            }
        },
        mounted:mounted,
    }
</script>
