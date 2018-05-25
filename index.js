/**
 * @file   mofron-comp-framedd/index.js
 * @author simpart
 */
let mf = require('mofron');
let DropDown = require('mofron-comp-dropdown');
let Text = require('mofron-comp-text');
let Frame = require('mofron-comp-frame');
let efCenter = require('mofron-effect-center');
let Click = require('mofron-event-click');
let Focus = require('mofron-event-focus');

/**
 * @class mofron.comp.Framedd
 * @brief frame dropdown component for mofron
 */
mf.comp.Framedd = class extends DropDown {
    
    /**
     * initialize component
     * 
     * @param po paramter or option
     */
    constructor (po) {
        try {
            super();
            this.name('Framedd');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param prm : 
     */
    initDomConts (prm) {
        try {
            this.adom().addChild(
                new mf.Dom('div', this)
            );
            // for label
            super.addChild(new mf.Component({visible:false}), undefined, false);
            let arrow = new Text('&#9660;');
            arrow.style({
                'position'   : 'absolute',
                'text-align' : 'right',
                'top'        : (this.getFrame().height()/2) + (0 - (arrow.size()/2)) + 'px',
                'right'      : '10px'
                
            });
            super.addChild(
                new mf.Component({
                    style    : { 'position' : 'relative' },
                    addChild : arrow
                }),
                undefined,
                false
            );
            
            /* get index string */
            let idx_txt = '';
            if (undefined !== prm) {
                if (false === Array.isArray(prm)) {
                    throw new Error('invalid paramter');
                }
                this.child(prm);
            }
            
            this.addEvent(
                new Focus(
                    (fcs, cmp)=> {
                        if ((false === cmp.focus()) && (true === fcs)) {
                            cmp.focus(true);
                        } else if (false === fcs) {
                            cmp.focus(false);
                        }
                    }
                )
            );
            
            /* default config */
            this.select(0);
            this.width(150);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    child (prm) {
        try {
            let ret = super.child(prm);
            if (undefined !== ret) {
                let nret = new Array();
                for (let idx=1; idx < ret.length ;idx++) {
                    nret.push(ret[idx]);
                }
                ret = nret;
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            /* configure child */
            if (true !== mf.func.isInclude(chd, 'Text')) {
                throw new Error('invalid parameter');
            }
            if (null === chd.getConfig('effect', 'Center')) {
                chd.addEffect(new efCenter());
            }
            
            /* add child */
            let wrp_frm = this.getFrame();
            wrp_frm.addChild(chd);
            if (0 !== this.child().length) {
                wrp_frm.visible(false);
            }
            super.addChild(wrp_frm, idx, false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFrame (opt) {
        try {
            if (undefined === opt) {
                /* getter */
                if (undefined === this.m_frmdd_frm) {
                    this.getFrame({
                        height  : 40,
                    });
                }
                let clk_fnc = (cmp, dd) => {
                    try {
                        dd.clickEvent(cmp);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                let ret = new Frame({
                    event : [ new Click(clk_fnc, this) ]
                });
                ret.execOption(this.m_frmdd_frmopt);
                return ret;
            }
            /* setter */
            if ('object' !== typeof opt) {
                throw new Error('invalid paramter');
            }
            if (undefined === this.m_frmdd_frmopt) {
                this.m_frmdd_frmopt = {};
            }
            for (let oidx in opt) {
                this.m_frmdd_frmopt[oidx] = opt[oidx];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    clickEvent (frm) {
        try {
            let chd = this.child();
            let clk_idx = undefined;
            for (let fidx in chd) {
                if (frm.getId() === chd[fidx].getId()) {
                    clk_idx = fidx;//-1;
                    break;
                }
            }
            let sts = this.getConfig('event', 'Focus').focus();
            if (true === sts) {
                this.select(clk_idx);
                setTimeout(
                    (dd) => {
                        console.log("close");
                        dd.getConfig('event', 'Focus').focus(false);
                    },
                    100,
                    this
                )
            }
            //this.focus(!sts);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    focus (prm) {
        try {
            let ret = super.focus(prm);
            if (undefined !== ret) {
                return ret;
            }
            
            let chd = this.child();
            if (true === prm) {
                /* open process */
                for (let cidx in chd) {
                    chd[cidx].visible(true);
                }
            } else {
                /* close process */
                let selidx = this.select();
                for (let cidx in chd) {
                    if (selidx == cidx) {
                        continue;
                    }
                    chd[cidx].visible(false);
                }
            }
            
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm) {
        try {
            let ret = super.width(prm);
            if (undefined === ret) {
                let chd = this.child();
                for (let cidx in chd) {
                    chd[cidx].width(prm);
                }
                this.getFrame({ width : prm });
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }
}
module.exports = mofron.comp.Framedd;
/* end of file */
